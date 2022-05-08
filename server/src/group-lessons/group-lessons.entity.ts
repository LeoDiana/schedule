import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AcademicStatus } from '../academic-statuses/academic-statuses.entity';

@Entity()
export class GroupLesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  surname: string;

  @Column()
  patronymic: string;

  @ManyToOne(() => AcademicStatus)
  @JoinColumn()
  academicStatus: AcademicStatus;
}
