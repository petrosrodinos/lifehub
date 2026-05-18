import { Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { AiService } from '@/integrations/ai/services/ai.service';
import { PineconeService } from '@/integrations/vector-db/pinecone.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AiProviders, AiModels } from '@/integrations/ai/interfaces/ai.interface';

@Injectable()
export class NotesService {
    private readonly logger = new Logger(NotesService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly aiService: AiService,
        private readonly pineconeService: PineconeService,
    ) { }

    private async embedAndUpsert(uuid: string, user_uuid: string, type: string, title: string, content: string): Promise<void> {
        const vector = await this.aiService.embedText(content);
        await this.pineconeService.upsertVector(uuid, vector, { user_uuid, type, title });
    }

    async create(user_uuid: string, dto: CreateNoteDto) {
        try {
            const note = await this.prisma.note.create({
                data: { user_uuid, title: dto.title, type: dto.type, content: dto.content },
            });

            try {
                await this.embedAndUpsert(note.uuid, user_uuid, dto.type, dto.title, dto.content);
                return await this.prisma.note.update({
                    where: { uuid: note.uuid },
                    data: { vector_id: note.uuid },
                });
            } catch (err) {
                this.logger.error(`Pinecone upsert failed for note ${note.uuid}: ${err.message}`);
                return note;
            }
        } catch (error) {
            throw new InternalServerErrorException('Failed to create note');
        }
    }

    async findAll(user_uuid: string) {
        try {
            return await this.prisma.note.findMany({
                where: { user_uuid },
                orderBy: { created_at: 'desc' },
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to get notes');
        }
    }

    async findOne(user_uuid: string, uuid: string) {
        try {
            const note = await this.prisma.note.findFirst({ where: { uuid, user_uuid } });
            if (!note) throw new NotFoundException('Note not found');
            return note;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to get note');
        }
    }

    async update(user_uuid: string, uuid: string, dto: UpdateNoteDto) {
        try {
            await this.findOne(user_uuid, uuid);

            const updated = await this.prisma.note.update({
                where: { uuid },
                data: {
                    ...dto,
                    ...(dto.content !== undefined ? { summary: null } : {}),
                },
            });

            try {
                await this.embedAndUpsert(uuid, user_uuid, updated.type, updated.title, updated.content);
                if (!updated.vector_id) {
                    await this.prisma.note.update({ where: { uuid }, data: { vector_id: uuid } });
                }
            } catch (err) {
                this.logger.error(`Pinecone upsert failed on update for note ${uuid}: ${err.message}`);
            }

            return updated;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to update note');
        }
    }

    async remove(user_uuid: string, uuid: string) {
        try {
            await this.findOne(user_uuid, uuid);

            try {
                await this.pineconeService.deleteVector(uuid);
            } catch (err) {
                this.logger.warn(`Pinecone delete failed for note ${uuid}: ${err.message}`);
            }

            return await this.prisma.note.delete({ where: { uuid } });
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete note');
        }
    }

    async summarize(user_uuid: string, uuid: string) {
        try {
            const note = await this.findOne(user_uuid, uuid);

            if (note.summary) {
                return { summary: note.summary };
            }

            const { response } = await this.aiService.generateText({
                provider: AiProviders.openai,
                model: AiModels.openai.gpt4oMini,
                system: 'You are a helpful assistant. Summarize the given note concisely using markdown formatting. Use headers, bullet points, and bold text where appropriate.',
                prompt: `Summarize the following ${note.type.toLowerCase()} note titled "${note.title}":\n\n${note.content}`,
                maxTokens: 1024,
            });

            const updated = await this.prisma.note.update({
                where: { uuid },
                data: { summary: response },
            });

            return { summary: updated.summary };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to summarize note');
        }
    }
}
