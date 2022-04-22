import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AcademicStatus } from '../academic-status/academic-status.entity';

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

  @ManyToOne(() => AcademicStatus)
  @JoinColumn()
  academicStatus: AcademicStatus;
}
