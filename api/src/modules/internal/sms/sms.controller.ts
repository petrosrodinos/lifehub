import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SmsService } from './sms.service';
import { CreateSmDto } from './dto/create-sm.dto';
import { UpdateSmDto } from './dto/update-sm.dto';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { Roles } from '@/shared/decorators/roles.decorator';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { AuthRoles } from '@/modules/auth/interfaces/auth.interface';

@ApiTags('Internal - SMS')
@ApiBearerAuth()
@Controller('sms')
@UseGuards(JwtGuard, RolesGuard)
@Roles(AuthRoles.ADMIN)
export class SmsController {
  constructor(private readonly smsService: SmsService) { }

  @Post()
  @ApiOperation({ summary: 'Send an SMS (Admin only)' })
  @ApiResponse({ status: 201, description: 'SMS sent successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  create(@Body() createSmDto: CreateSmDto) {
    return this.smsService.create(createSmDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all SMS records (Admin only)' })
  @ApiResponse({ status: 200, description: 'SMS records retrieved successfully' })
  findAll() {
    return this.smsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific SMS record (Admin only)' })
  @ApiResponse({ status: 200, description: 'SMS record retrieved successfully' })
  findOne(@Param('id') id: string) {
    return this.smsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an SMS record (Admin only)' })
  @ApiResponse({ status: 200, description: 'SMS record updated successfully' })
  update(@Param('id') id: string, @Body() updateSmDto: UpdateSmDto) {
    return this.smsService.update(+id, updateSmDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an SMS record (Admin only)' })
  @ApiResponse({ status: 200, description: 'SMS record deleted successfully' })
  remove(@Param('id') id: string) {
    return this.smsService.remove(+id);
  }
}
