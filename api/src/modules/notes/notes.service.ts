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

    async create(user_uuid: string, dto: CreateNoteDto) {
        try {
            const tagConnects = dto.tag_uuids?.length
                ? await this.resolveValidTagUuids(dto.tag_uuids, user_uuid)
                : [];

            const note = await this.prisma.note.create({
                data: {
                    user_uuid,
                    title: dto.title,
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
                    dto.title,
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

    async autoTag(user_uuid: string, uuid: string, skipEmbed = false) {
        try {
            const note = await this.findOne(user_uuid, uuid);

            // If the note already has tags, skip auto-tagging
            if (note.tags && note.tags.length > 0) return note;

            const existingTags = await this.prisma.noteTag.findMany({
                where: { user_uuid },
                orderBy: { created_at: 'asc' },
            });

            const PRESET_COLORS = ['#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#06b6d4', '#f97316'];

            const tagsContext = existingTags.length > 0
                ? existingTags.map((t) => `- uuid: "${t.uuid}", title: "${t.title}"`).join('\n')
                : '(none)';

            const { response } = await this.aiService.generateText({
                provider: AiProviders.openai,
                model: AiModels.openai.gpt4oMini,
                system: 'You are a note tagging assistant. You ONLY output a single raw JSON object — no markdown, no explanation, nothing else.',
                prompt: `Note title: "${note.title}"
Note type: ${note.type}
Note content (first 800 chars): ${note.content.slice(0, 800)}

Available tags:
${tagsContext}

Pick the best single tag for this note. If an existing tag fits well, use it.
If no existing tag fits, suggest creating a new one. Choose a color from: ${PRESET_COLORS.join(', ')}.

Reply with ONLY one of:
{"action":"assign","tag_uuid":"<uuid of existing tag>"}
{"action":"create","title":"<short tag name, max 30 chars>","color":"<hex from the list>"}`,
                maxTokens: 100,
            });

            // Extract JSON from response (handles stray whitespace/newlines)
            const jsonMatch = response.match(/\{[\s\S]*?\}/);
            if (!jsonMatch) {
                this.logger.warn(`Auto-tag: no JSON found in AI response for note ${uuid}`);
                return note;
            }

            let parsed: { action: string; tag_uuid?: string; title?: string; color?: string };
            try {
                parsed = JSON.parse(jsonMatch[0]);
            } catch {
                this.logger.warn(`Auto-tag: invalid JSON for note ${uuid}: ${response}`);
                return note;
            }

            const VALID_COLORS = new Set(PRESET_COLORS);
            const isValidHex = (c: string) => /^#[0-9a-fA-F]{6}$/.test(c);

            if (parsed.action === 'assign' && parsed.tag_uuid) {
                const tag = await this.prisma.noteTag.findFirst({
                    where: { uuid: parsed.tag_uuid, user_uuid },
                });
                if (!tag) {
                    this.logger.warn(`Auto-tag: AI returned unknown tag_uuid ${parsed.tag_uuid}`);
                    return note;
                }
                const updated = await this.prisma.note.update({
                    where: { uuid },
                    data: { tags: { connect: { uuid: tag.uuid } } },
                    include: { tags: true },
                });
                if (!skipEmbed) {
                    try {
                        await this.embedAndUpsert(uuid, user_uuid, note.type, note.title, note.content, updated.tags);
                    } catch (err) {
                        this.logger.warn(`Pinecone re-embed after auto-tag failed for note ${uuid}: ${err.message}`);
                    }
                }
                return updated;
            }

            if (parsed.action === 'create' && parsed.title) {
                const title = parsed.title.slice(0, 30).trim();
                const color = parsed.color && (VALID_COLORS.has(parsed.color) || isValidHex(parsed.color))
                    ? parsed.color
                    : '#8b5cf6';

                const newTag = await this.prisma.noteTag.create({
                    data: { user_uuid, title, color },
                });
                const updated = await this.prisma.note.update({
                    where: { uuid },
                    data: { tags: { connect: { uuid: newTag.uuid } } },
                    include: { tags: true },
                });
                if (!skipEmbed) {
                    try {
                        await this.embedAndUpsert(uuid, user_uuid, note.type, note.title, note.content, updated.tags);
                    } catch (err) {
                        this.logger.warn(`Pinecone re-embed after auto-tag failed for note ${uuid}: ${err.message}`);
                    }
                }
                return updated;
            }

            return note;
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
