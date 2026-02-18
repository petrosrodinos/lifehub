import { IsEnum, IsUUID, IsArray, ArrayMinSize } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { SCHEDULE_DAYS, ScheduleDay } from '@/shared/config/schedule/schedule-days.config'

export class DuplicateSlotDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', description: 'Slot UUID to duplicate' })
  @IsUUID()
  slot_uuid: string

  @ApiProperty({ 
    example: ['MONDAY', 'TUESDAY'], 
    enum: SCHEDULE_DAYS, 
    isArray: true,
    description: 'Target days to duplicate to' 
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(SCHEDULE_DAYS, { each: true })
  target_days: ScheduleDay[]
}
