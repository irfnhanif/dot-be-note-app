import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Note extends Model {
  @Column
  title: string;

  @Column
  content: string;

  @Column
  authorId: string;

  @Column
  createdAt?: any;

  @Column
  updatedAt?: any;
}
