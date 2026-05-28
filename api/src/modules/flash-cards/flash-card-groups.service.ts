import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { FlashCardGenerationService } from './flash-card-generation.service';
import { FlashCardImageService } from './flash-card-image.service';
import { CreateFlashCardGroupDto } from './dto/create-flash-card-group.dto';
import { UpdateFlashCardGroupDto } from './dto/update-flash-card-group.dto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismaAny = any;

@Injectable()
export class FlashCardGroupsService {
    private readonly logger = new Logger(FlashCardGroupsService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly generationService: FlashCardGenerationService,
        private readonly imageService: FlashCardImageService,
    ) {}

    private get db(): PrismaAny {
        return this.prisma;
    }

    async create(userUuid: string, dto: CreateFlashCardGroupDto) {
        const notes = await this.prisma.note.findMany({
            where: { user_uuid: userUuid, uuid: { in: dto.note_uuids } },
        });

        const foundUuids = notes.map((n) => n.uuid);
        const missing = dto.note_uuids.filter((u) => !foundUuids.includes(u));
        if (missing.length > 0) {
            throw new NotFoundException(`Notes not found: ${missing.join(', ')}`);
        }

        const group = await this.db.flashCardGroup.create({
            data: {
                user_uuid: userUuid,
                user_title: dto.user_title,
                source_note_uuids: dto.note_uuids,
                status: 'PENDING',
            },
        });

        const cardsPerNote = dto.cards_per_note ?? 5;
        setImmediate(() => {
            this.generationService.generate(group, notes, userUuid, cardsPerNote).catch((err: Error) => {
                this.logger.error(`Background generation error for group ${group.uuid}: ${err.message}`);
            });
        });

        return group;
    }

    async findAll(userUuid: string) {
        return this.db.flashCardGroup.findMany({
            where: { user_uuid: userUuid },
            include: {
                _count: { select: { cards: true } },
                cards: {
                    take: 1,
                    include: { image: true },
                    orderBy: { order_index: 'asc' },
                },
            },
            orderBy: { created_at: 'desc' },
        });
    }

    async findOne(userUuid: string, uuid: string) {
        const group = await this.db.flashCardGroup.findFirst({
            where: { uuid, user_uuid: userUuid },
            include: {
                cards: {
                    include: { image: true },
                    orderBy: { order_index: 'asc' },
                },
            },
        });

        if (!group) throw new NotFoundException('Flash card group not found');
        return group;
    }

    async update(userUuid: string, uuid: string, dto: UpdateFlashCardGroupDto) {
        await this.findOne(userUuid, uuid);

        return this.db.flashCardGroup.update({
            where: { uuid },
            data: { user_title: dto.user_title },
        });
    }

    async remove(userUuid: string, uuid: string) {
        await this.findOne(userUuid, uuid);

        await this.imageService.deleteForGroup(uuid);

        return this.db.flashCardGroup.delete({ where: { uuid } });
    }
}
