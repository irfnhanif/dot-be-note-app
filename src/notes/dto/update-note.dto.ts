import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  title: string;
  content: string;
  authorId: number;
  createdAt?: any;
  updatedAt?: any;
}
