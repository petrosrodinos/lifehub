import { Module } from "@nestjs/common";
import { AiIntegrationModule } from '@/integrations/ai/ai.module';
import { AiHelperService } from "./ai.service";

@Module({
    imports: [AiIntegrationModule],
    providers: [AiHelperService],
    exports: [AiHelperService],
})
export class AiHelperModule { }