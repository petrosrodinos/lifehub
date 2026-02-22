import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { RedisCacheService } from './redis-cache.service';
import { CreateRedisCacheDto } from './dto/create-redis-cache.dto';
import { Roles } from '@/shared/decorators/roles.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { AuthRoles } from '@/modules/auth/interfaces/auth.interface';

@ApiTags('Internal - Redis Cache')
@ApiBearerAuth()
@Controller('redis-cache')
@UseGuards(JwtGuard, RolesGuard)
@Roles(AuthRoles.ADMIN)
export class RedisCacheController {
  constructor(private readonly redisCacheService: RedisCacheService) { }

  @Post()
  @ApiOperation({ summary: 'Set a cache entry (Admin only)' })
  @ApiResponse({ status: 201, description: 'Cache entry created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  create(@Body() createRedisCacheDto: CreateRedisCacheDto) {
    return this.redisCacheService.create(createRedisCacheDto);
  }

  @Get(':key')
  @ApiOperation({ summary: 'Get a cache entry by key (Admin only)' })
  @ApiParam({ name: 'key', description: 'Cache key' })
  @ApiResponse({ status: 200, description: 'Cache entry retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Cache key not found' })
  findOne(@Param('key') key: string) {
    return this.redisCacheService.findOne(key);
  }

  @Delete(':key')
  @ApiOperation({ summary: 'Delete a cache entry by key (Admin only)' })
  @ApiParam({ name: 'key', description: 'Cache key' })
  @ApiResponse({ status: 200, description: 'Cache entry deleted successfully' })
  remove(@Param('key') key: string) {
    return this.redisCacheService.remove(key);
  }
}
