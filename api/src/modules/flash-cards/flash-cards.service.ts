import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';

interface CreateCardPayload {
    group_uuid: string;
    front: string;
    back: string;
    keywords: string[];
    ai_image_prompt?: string;
    order_index: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PrismaAny = any;

@Injectable()
export class FlashCardsService {
    constructor(private readonly prisma: PrismaService) {}

    private get db(): PrismaAny {
        return this.prisma;
    }

    async createMany(cards: CreateCardPayload[]) {
        if (cards.length === 0) return [];

        await this.db.flashCard.createMany({ data: cards });

        return this.db.flashCard.findMany({
            where: { group_uuid: cards[0].group_uuid },
            orderBy: { order_index: 'asc' },
        });
    }

    async findByGroup(group_uuid: string) {
        return this.db.flashCard.findMany({
            where: { group_uuid },
            include: { image: true },
            orderBy: { order_index: 'asc' },
        });
    }

    async remove(userUuid: string, uuid: string) {
        const card = await this.db.flashCard.findFirst({
            where: { uuid },
            include: { group: { select: { user_uuid: true } } },
        });
        if (!card || card.group.user_uuid !== userUuid) {
            throw new NotFoundException('Flash card not found');
        }
        return this.db.flashCard.delete({ where: { uuid } });
    }
}
