import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Day {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
