import { PartialType } from '@nestjs/swagger'
import { CreateWorkoutEntryDto } from './create-workout-entry.dto'

export class UpdateWorkoutEntryDto extends PartialType(CreateWorkoutEntryDto) {}
