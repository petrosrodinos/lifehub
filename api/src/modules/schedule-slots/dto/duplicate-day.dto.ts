import { IsEnum, IsArray, ArrayMinSize } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { SCHEDULE_DAYS, ScheduleDay } from '@/shared/config/schedule/schedule-days.config'

export class DuplicateDayDto {
  @ApiProperty({ example: 'MONDAY', enum: SCHEDULE_DAYS, description: 'Source day to duplicate from' })
  @IsEnum(SCHEDULE_DAYS)
  source_day: ScheduleDay

  @ApiProperty({ 
    example: ['TUESDAY', 'WEDNESDAY'], 
    enum: SCHEDULE_DAYS, 
    isArray: true,
    description: 'Target days to duplicate to' 
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(SCHEDULE_DAYS, { each: true })
  target_days: ScheduleDay[]
}
