import { PartialType } from '@nestjs/mapped-types'
import { CreateScheduleSlotDto } from '../../schedule-slots/dto/create-schedule-slot.dto'

export class UpdateScheduleSlotDto extends PartialType(CreateScheduleSlotDto) { }
