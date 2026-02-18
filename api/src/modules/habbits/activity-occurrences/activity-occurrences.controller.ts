import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivityOccurrencesService } from './activity-occurrences.service';
import { CreateActivityOccurrenceDto } from './dto/create-activity-occurrence.dto';
import { UpdateActivityOccurrenceDto } from './dto/update-activity-occurrence.dto';

@Controller('activity-occurrences')
export class ActivityOccurrencesController {
  constructor(private readonly activityOccurrencesService: ActivityOccurrencesService) {}

  @Post()
  create(@Body() createActivityOccurrenceDto: CreateActivityOccurrenceDto) {
    return this.activityOccurrencesService.create(createActivityOccurrenceDto);
  }

  @Get()
  findAll() {
    return this.activityOccurrencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityOccurrencesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityOccurrenceDto: UpdateActivityOccurrenceDto) {
    return this.activityOccurrencesService.update(+id, updateActivityOccurrenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityOccurrencesService.remove(+id);
  }
}
