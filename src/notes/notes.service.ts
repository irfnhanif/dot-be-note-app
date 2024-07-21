import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Note } from './models/note.model';
import { where } from 'sequelize';

@Injectable()
export class NotesService {

  constructor(
    @InjectModel(Note) 
    private noteModel: typeof Note
  ) {}

  create(createNoteDto: CreateNoteDto): Promise<Note> {
    return this.noteModel.create({
      title: createNoteDto.title,
      content: createNoteDto.content,
      authorId: createNoteDto.authorId,
      createdAt: createNoteDto.createdAt,
      updatedAt: createNoteDto.updatedAt
    });
  }

  async findByAuthorId(userId: number): Promise<Note[]> {
    return this.noteModel.findAll({where: {authorId: userId}});
  }

  findOne(id: number): Promise<Note> {
    return this.noteModel.findByPk(id);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<void> {
    await this.noteModel.update({
      title: updateNoteDto.title,
      content: updateNoteDto.content,
      authorId: updateNoteDto.authorId,
      createdAt: updateNoteDto.createdAt,
      updatedAt: updateNoteDto.updatedAt,
    }, {
      where: { id },
    });
  }

  async remove(id: number): Promise<void> {
    await this.noteModel.destroy({ where: { id } });
  }
}
