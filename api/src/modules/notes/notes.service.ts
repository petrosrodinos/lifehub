import { Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { AiService } from '@/integrations/ai/services/ai.service';
import { PineconeService } from '@/integrations/vector-db/pinecone.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AiProviders, AiModels } from '@/integrations/ai/interfaces/ai.interface';
import { AutoTagDecision, suggestNoteTag } from './utils/auto-tag-note.utils';
import { fallbackNoteTitle, generateNoteTitle } from './utils/generate-note-title.utils';

@Injectable()
export class NotesService {
    private readonly logger = new Logger(NotesService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly aiService: AiService,
        private readonly pineconeService: PineconeService,
    ) { }

    private async embedAndUpsert(
        uuid: string,
        user_uuid: string,
        type: string,
        title: string,
        content: string,
        tags?: { title: string }[],
    ): Promise<void> {
        const vector = await this.aiService.embedText(content);
        const metadata: Record<string, string> = { user_uuid, type, title };
        if (tags && tags.length > 0) {
            metadata.tags = tags.map((t) => t.title).join(', ');
        }
        await this.pineconeService.upsertVector(uuid, vector, metadata);
    }

    private async resolveValidTagUuids(tag_uuids: string[], user_uuid: string) {
        if (!tag_uuids || tag_uuids.length === 0) return [];
        const validTags = await this.prisma.noteTag.findMany({
            where: { uuid: { in: tag_uuids }, user_uuid },
            select: { uuid: true },
        });
        return validTags.map((t) => ({ uuid: t.uuid }));
    }

    private async resolveNoteTitle(dto: CreateNoteDto): Promise<string> {
        const trimmed = dto.title?.trim();
        if (trimmed) return trimmed;
        try {
            return await generateNoteTitle(this.aiService, dto.content, dto.type);
        } catch (err) {
            this.logger.warn(`AI title generation failed: ${err.message}`);
            return fallbackNoteTitle(dto.content);
        }
    }

    async create(user_uuid: string, dto: CreateNoteDto) {
        try {
            const title = await this.resolveNoteTitle(dto);
            const tagConnects = dto.tag_uuids?.length
                ? await this.resolveValidTagUuids(dto.tag_uuids, user_uuid)
                : [];

            const note = await this.prisma.note.create({
                data: {
                    user_uuid,
                    title,
                    type: dto.type,
                    content: dto.content,
                    ...(tagConnects.length ? { tags: { connect: tagConnects } } : {}),
                },
                include: { tags: true },
            });

            // Auto-tag before embedding so the final tags end up in Pinecone metadata
            let finalNote = note;
            if (!dto.tag_uuids?.length) {
                try {
                    finalNote = await this.autoTag(user_uuid, note.uuid, true);
                } catch (err) {
                    this.logger.warn(`Auto-tag failed for note ${note.uuid}: ${err.message}`);
                }
            }

            // Embed with final tags — best effort
            try {
                await this.embedAndUpsert(
                    finalNote.uuid,
                    user_uuid,
                    dto.type,
                    title,
                    dto.content,
                    finalNote.tags,
                );
                return await this.prisma.note.update({
                    where: { uuid: finalNote.uuid },
                    data: { vector_id: finalNote.uuid },
                    include: { tags: true },
                });
            } catch (err) {
                this.logger.error(`Pinecone upsert failed for note ${finalNote.uuid}: ${err.message}`);
                return finalNote;
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
                include: { tags: true },
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to get notes');
        }
    }

    async findOne(user_uuid: string, uuid: string) {
        try {
            const note = await this.prisma.note.findFirst({
                where: { uuid, user_uuid },
                include: { tags: true },
            });
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

            let tagSet: { uuid: string }[] | undefined;
            if (dto.tag_uuids !== undefined) {
                tagSet = dto.tag_uuids.length
                    ? await this.resolveValidTagUuids(dto.tag_uuids, user_uuid)
                    : [];
            }

            const updated = await this.prisma.note.update({
                where: { uuid },
                data: {
                    ...(dto.title !== undefined ? { title: dto.title } : {}),
                    ...(dto.type !== undefined ? { type: dto.type } : {}),
                    ...(dto.content !== undefined ? { content: dto.content, summary: null } : {}),
                    ...(tagSet !== undefined ? { tags: { set: tagSet } } : {}),
                },
                include: { tags: true },
            });

            try {
                await this.embedAndUpsert(uuid, user_uuid, updated.type, updated.title, updated.content, updated.tags);
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

    async bulkAutoTag(user_uuid: string) {
        try {
            // Fetch all untagged notes for this user
            const untaggedNotes = await this.prisma.note.findMany({
                where: { user_uuid, tags: { none: {} } },
                select: { uuid: true },
                orderBy: { created_at: 'desc' },
            });

            const tagCountBefore = await this.prisma.noteTag.count({ where: { user_uuid } });

            let successfullyTagged = 0;

            for (const { uuid } of untaggedNotes) {
                try {
                    const result = await this.autoTag(user_uuid, uuid);
                    if (result.tags && result.tags.length > 0) {
                        successfullyTagged++;
                    }
                } catch (err) {
                    this.logger.warn(`Bulk auto-tag: failed on note ${uuid}: ${err.message}`);
                }
            }

            const tagCountAfter = await this.prisma.noteTag.count({ where: { user_uuid } });

            return {
                untagged_processed: untaggedNotes.length,
                successfully_tagged: successfullyTagged,
                new_tags_created: tagCountAfter - tagCountBefore,
            };
        } catch (error) {
            throw new InternalServerErrorException('Failed to bulk auto-tag notes');
        }
    }

    private async reembedNoteAfterTag(
        uuid: string,
        user_uuid: string,
        note: { type: string; title: string; content: string },
        tags: { title: string }[],
        skipEmbed: boolean,
    ): Promise<void> {
        if (skipEmbed) return;
        try {
            await this.embedAndUpsert(uuid, user_uuid, note.type, note.title, note.content, tags);
        } catch (err) {
            this.logger.warn(`Pinecone re-embed after auto-tag failed for note ${uuid}: ${err.message}`);
        }
    }

    private async applyAutoTagDecision(
        user_uuid: string,
        noteUuid: string,
        note: { type: string; title: string; content: string },
        decision: AutoTagDecision,
        skipEmbed: boolean,
    ) {
        if (decision.action === 'assign') {
            const tag = await this.prisma.noteTag.findFirst({
                where: { uuid: decision.tag_uuid, user_uuid },
            });
            if (!tag) {
                this.logger.warn(`Auto-tag: AI returned unknown tag_uuid ${decision.tag_uuid}`);
                return null;
            }
            const updated = await this.prisma.note.update({
                where: { uuid: noteUuid },
                data: { tags: { connect: { uuid: tag.uuid } } },
                include: { tags: true },
            });
            await this.reembedNoteAfterTag(noteUuid, user_uuid, note, updated.tags, skipEmbed);
            return updated;
        }

        const newTag = await this.prisma.noteTag.create({
            data: { user_uuid, title: decision.title, color: decision.color },
        });
        const updated = await this.prisma.note.update({
            where: { uuid: noteUuid },
            data: { tags: { connect: { uuid: newTag.uuid } } },
            include: { tags: true },
        });
        await this.reembedNoteAfterTag(noteUuid, user_uuid, note, updated.tags, skipEmbed);
        return updated;
    }

    async autoTag(user_uuid: string, uuid: string, skipEmbed = false) {
        try {
            const note = await this.findOne(user_uuid, uuid);
            if (note.tags.length > 0) return note;

            const existingTags = await this.prisma.noteTag.findMany({
                where: { user_uuid },
                orderBy: { created_at: 'asc' },
                select: { uuid: true, title: true, color: true },
            });

            const decision = await suggestNoteTag(
                this.aiService,
                { title: note.title, type: note.type, content: note.content },
                existingTags,
            );

            if (!decision) {
                this.logger.warn(`Auto-tag: no valid decision from AI for note ${uuid}`);
                return note;
            }

            const updated = await this.applyAutoTagDecision(
                user_uuid,
                uuid,
                { type: note.type, title: note.title, content: note.content },
                decision,
                skipEmbed,
            );

            return updated ?? note;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            this.logger.error(`Auto-tag failed for note ${uuid}: ${error.message}`);
            throw new InternalServerErrorException('Failed to auto-tag note');
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
