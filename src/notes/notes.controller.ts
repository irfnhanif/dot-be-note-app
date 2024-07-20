import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './models/note.model';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    createNoteDto.createdAt = createNoteDto.createdAt || new Date();
    createNoteDto.updatedAt = createNoteDto.updatedAt || new Date();
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll(): Promise<Note[]> {
    const notes = this.notesService.findAll();
    
    return notes;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Note> {
    const note = await this.notesService.findOne(+id);
    if (!note) {
      throw new NotFoundException();
    }

    return note;
  }

  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<void> {
    const note = await this.notesService.findOne(+id);
    if (!note) {
      throw new NotFoundException();
    }
    updateNoteDto.updatedAt = updateNoteDto.updatedAt || new Date();

    await this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    const note = await this.notesService.findOne(+id);
    if (!note) {
      throw new NotFoundException();
    }

    await this.notesService.remove(+id);
  }
}
