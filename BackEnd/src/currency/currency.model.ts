import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Currency extends Model {
  @Column
  name: string;

  @Column
  price: number;

  @Column
  info: string;
}
