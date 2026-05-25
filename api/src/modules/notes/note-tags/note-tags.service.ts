import { Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { CreateNoteTagDto } from './dto/create-note-tag.dto';
import { UpdateNoteTagDto } from './dto/update-note-tag.dto';

@Injectable()
export class NoteTagsService {
    private readonly logger = new Logger(NoteTagsService.name);

    constructor(private readonly prisma: PrismaService) {}

    async create(user_uuid: string, dto: CreateNoteTagDto) {
        try {
            return await this.prisma.noteTag.create({
                data: {
                    user_uuid,
                    title: dto.title,
                    color: dto.color ?? '#8b5cf6',
                },
            });
        } catch (error) {
            this.logger.error(`Failed to create note tag: ${error.message}`);
            throw new InternalServerErrorException('Failed to create note tag');
        }
    }

    async findAll(user_uuid: string) {
        try {
            return await this.prisma.noteTag.findMany({
                where: { user_uuid },
                orderBy: { created_at: 'asc' },
            });
        } catch (error) {
            this.logger.error(`Failed to get note tags: ${error.message}`);
            throw new InternalServerErrorException('Failed to get note tags');
        }
    }

    async findOne(user_uuid: string, uuid: string) {
        try {
            const tag = await this.prisma.noteTag.findFirst({ where: { uuid, user_uuid } });
            if (!tag) throw new NotFoundException('Note tag not found');
            return tag;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to get note tag');
        }
    }

    async update(user_uuid: string, uuid: string, dto: UpdateNoteTagDto) {
        try {
            await this.findOne(user_uuid, uuid);
            return await this.prisma.noteTag.update({
                where: { uuid },
                data: {
                    ...(dto.title !== undefined ? { title: dto.title } : {}),
                    ...(dto.color !== undefined ? { color: dto.color } : {}),
                },
            });
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to update note tag');
        }
    }

    async remove(user_uuid: string, uuid: string) {
        try {
            await this.findOne(user_uuid, uuid);
            return await this.prisma.noteTag.delete({ where: { uuid } });
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Failed to delete note tag');
        }
    }
}
