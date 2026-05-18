import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { PrismaModule } from '@/core/databases/prisma/prisma.module';
import { AiIntegrationModule } from '@/integrations/ai/ai.module';
import { PineconeModule } from '@/integrations/vector-db/pinecone.module';

@Module({
    imports: [PrismaModule, AiIntegrationModule, PineconeModule],
    controllers: [NotesController],
    providers: [NotesService],
})
export class NotesModule { }
