import { PartialType } from '@nestjs/swagger';
import { CreateNoteTagDto } from './create-note-tag.dto';

export class UpdateNoteTagDto extends PartialType(CreateNoteTagDto) {}
