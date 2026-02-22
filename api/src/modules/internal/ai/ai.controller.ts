import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { InternalAiService } from './ai.service';
import { CreateAiDto } from './dto/create-ai.dto';
import { Roles } from '@/shared/decorators/roles.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { AuthRoles } from '@/modules/auth/interfaces/auth.interface';

@ApiTags('Internal - AI')
@ApiBearerAuth()
@Controller('ai')
@UseGuards(JwtGuard, RolesGuard)
@Roles(AuthRoles.ADMIN)
export class AiController {
  constructor(private readonly aiService: InternalAiService) { }

  @Post()
  @ApiOperation({ summary: 'Send an AI prompt (Admin only)' })
  @ApiResponse({ status: 201, description: 'AI response generated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  create(@Body() createAiDto: CreateAiDto) {
    return this.aiService.create(createAiDto);
  }
}
