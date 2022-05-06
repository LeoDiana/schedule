import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LessonType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;
}
