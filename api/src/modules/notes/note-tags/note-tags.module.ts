import { Module } from '@nestjs/common';
import { NoteTagsService } from './note-tags.service';
import { NoteTagsController } from './note-tags.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [NoteTagsController],
    providers: [NoteTagsService],
})
export class NoteTagsModule {}
