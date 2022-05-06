import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LessonTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  timeStart: string;

  @Column()
  timeEnd: string;
}
