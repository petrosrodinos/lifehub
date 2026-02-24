import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HiddenActivitiesService } from './hidden-activities.service';
import { CreateHiddenActivityDto } from './dto/create-hidden-activity.dto';
import { UpdateHiddenActivityDto } from './dto/update-hidden-activity.dto';

@Controller('hidden-activities')
export class HiddenActivitiesController {
  constructor(private readonly hiddenActivitiesService: HiddenActivitiesService) {}

  @Post()
  create(@Body() createHiddenActivityDto: CreateHiddenActivityDto) {
    return this.hiddenActivitiesService.create(createHiddenActivityDto);
  }

  @Get()
  findAll() {
    return this.hiddenActivitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hiddenActivitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHiddenActivityDto: UpdateHiddenActivityDto) {
    return this.hiddenActivitiesService.update(+id, updateHiddenActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hiddenActivitiesService.remove(+id);
  }
}
