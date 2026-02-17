import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MuscleGroupsService } from './muscle-groups.service';
import { CreateMuscleGroupDto } from './dto/create-muscle-group.dto';
import { UpdateMuscleGroupDto } from './dto/update-muscle-group.dto';

@Controller('muscle-groups')
export class MuscleGroupsController {
  constructor(private readonly muscleGroupsService: MuscleGroupsService) {}

  @Post()
  create(@Body() createMuscleGroupDto: CreateMuscleGroupDto) {
    return this.muscleGroupsService.create(createMuscleGroupDto);
  }

  @Get()
  findAll() {
    return this.muscleGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.muscleGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMuscleGroupDto: UpdateMuscleGroupDto) {
    return this.muscleGroupsService.update(+id, updateMuscleGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.muscleGroupsService.remove(+id);
  }
}
