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
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './models/note.model';
import { AuthGuard } from 'src/auth/auth.guard';

// ToDo: Implement this --> https://docs.nestjs.com/security/authentication#implementing-the-authentication-guard

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Request() req: any,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<Note> {
    createNoteDto.authorId = req.user.id;
    createNoteDto.createdAt = createNoteDto.createdAt || new Date();
    createNoteDto.updatedAt = createNoteDto.updatedAt || new Date();

    return this.notesService.create(createNoteDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: any): Promise<Note[]> {
    const notes = this.notesService.findByAuthorId(req.user.id);

    return notes;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string): Promise<Note> {
    const note = await this.notesService.findOne(+id);
    if (!note || note.authorId !== req.user.id) {
      throw new NotFoundException();
    }

    return note;
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<void> {
    const note = await this.notesService.findOne(+id);
    if (!note || note.authorId !== req.user.id) {
      throw new NotFoundException();
    }
    updateNoteDto.updatedAt = updateNoteDto.updatedAt || new Date();

    await this.notesService.update(+id, updateNoteDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Request() req: any, @Param('id') id: string): Promise<void> {
    const note = await this.notesService.findOne(+id);
    if (!note || note.authorId !== req.user.id) {
      throw new NotFoundException();
    }

    await this.notesService.remove(+id);
  }
}
