import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AcademicStatus } from '../academic-statuses/academic-statuses.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  surname: string;

  @Column()
  patronymic: string;

  @ManyToOne(() => AcademicStatus, { eager: true })
  @JoinColumn()
  academicStatus: AcademicStatus;
}
