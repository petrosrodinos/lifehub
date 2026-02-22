import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger'
import { MuscleGroupsService } from './muscle-groups.service'
import { CreateMuscleGroupDto } from './dto/create-muscle-group.dto'
import { UpdateMuscleGroupDto } from './dto/update-muscle-group.dto'
import { JwtGuard } from '@/shared/guards/jwt.guard'
import { RolesGuard } from '@/shared/guards/roles.guard'
import { CurrentUser } from '@/shared/decorators/current-user.decorator'
import { Roles } from '@/shared/decorators/roles.decorator'
import { AuthRoles, type AuthRole } from '@/modules/auth/interfaces/auth.interface'

@ApiTags('Muscle Groups')
@ApiBearerAuth()
@Controller('muscle-groups')
@UseGuards(JwtGuard)
export class MuscleGroupsController {
  constructor(private readonly muscleGroupsService: MuscleGroupsService) { }

  @Post('seed')
  @UseGuards(RolesGuard)
  @Roles(AuthRoles.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Seed default muscle groups and exercises (Admin only)' })
  @ApiResponse({ status: 201, description: 'Default muscle groups seeded successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  seedDefaults(): Promise<{ muscleGroupsCreated: number; exercisesCreated: number }> {
    return this.muscleGroupsService.seedDefaults()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new muscle group' })
  @ApiResponse({ status: 201, description: 'Muscle group created successfully' })
  @ApiResponse({ status: 409, description: 'Muscle group with this name already exists' })
  create(
    @CurrentUser('user_uuid') user_uuid: string,
    @Body() createMuscleGroupDto: CreateMuscleGroupDto,
  ) {
    return this.muscleGroupsService.create(user_uuid, createMuscleGroupDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all muscle groups for the current user' })
  @ApiResponse({ status: 200, description: 'Muscle groups retrieved successfully' })
  findAll(@CurrentUser('user_uuid') user_uuid: string) {
    return this.muscleGroupsService.findAll(user_uuid)
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a specific muscle group by UUID' })
  @ApiParam({ name: 'uuid', description: 'Muscle group UUID' })
  @ApiResponse({ status: 200, description: 'Muscle group retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Muscle group not found' })
  findOne(
    @CurrentUser('user_uuid') user_uuid: string,
    @Param('uuid') uuid: string,
  ) {
    return this.muscleGroupsService.findOne(uuid, user_uuid)
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a muscle group' })
  @ApiParam({ name: 'uuid', description: 'Muscle group UUID' })
  @ApiResponse({ status: 200, description: 'Muscle group updated successfully' })
  @ApiResponse({ status: 404, description: 'Muscle group not found' })
  @ApiResponse({ status: 409, description: 'Muscle group with this name already exists' })
  update(
    @CurrentUser('user_uuid') user_uuid: string,
    @CurrentUser('role') role: AuthRole,
    @Param('uuid') uuid: string,
    @Body() updateMuscleGroupDto: UpdateMuscleGroupDto,
  ) {
    return this.muscleGroupsService.update(uuid, user_uuid, role, updateMuscleGroupDto)
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a muscle group' })
  @ApiParam({ name: 'uuid', description: 'Muscle group UUID' })
  @ApiResponse({ status: 200, description: 'Muscle group deleted successfully' })
  @ApiResponse({ status: 404, description: 'Muscle group not found' })
  remove(
    @CurrentUser('user_uuid') user_uuid: string,
    @CurrentUser('role') role: AuthRole,
    @Param('uuid') uuid: string,
  ) {
    return this.muscleGroupsService.remove(uuid, user_uuid, role)
  }
}
