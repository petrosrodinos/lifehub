import { IsString, IsEnum, Matches, IsInt, IsOptional, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { SCHEDULE_DAYS, ScheduleDay } from '@/shared/config/schedule/schedule-days.config'

export class CreateScheduleSlotDto {
  @ApiProperty({ example: 'MONDAY', enum: SCHEDULE_DAYS, description: 'Day of the week' })
  @IsEnum(SCHEDULE_DAYS)
  day: ScheduleDay

  @ApiProperty({ example: '05:00', description: 'Start time in HH:mm format' })
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'start_time must be in HH:mm format',
  })
  start_time: string

  @ApiProperty({ example: '07:00', description: 'End time in HH:mm format' })
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'end_time must be in HH:mm format',
  })
  end_time: string

  @ApiProperty({ example: 1, description: 'Activity ID' })
  @IsInt()
  activity_uuid: string

  @ApiProperty({ example: false, description: 'Whether this is a default schedule slot', required: false })
  @IsOptional()
  @IsBoolean()
  is_default?: boolean
}
