import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { Roles } from '@/shared/decorators/roles.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { AuthRoles } from '@/modules/auth/interfaces/auth.interface';

@ApiTags('Internal - Mail')
@ApiBearerAuth()
@Controller('mail')
@UseGuards(JwtGuard, RolesGuard)
@Roles(AuthRoles.ADMIN)
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post('send-email')
  @ApiOperation({ summary: 'Send an email (Admin only)' })
  @ApiResponse({ status: 201, description: 'Email sent successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  create(@Body() createMailDto: CreateMailDto) {
    return this.mailService.create(createMailDto);
  }
}
