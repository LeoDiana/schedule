import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from '../teachers/teachers.entity';
import { LessonType } from '../lesson-types/lesson-types.entity';
import { Classroom } from '../classrooms/classrooms.entity';
import { LessonTime } from '../lesson-times/lesson-times.entity';
import { Subject } from '../subjects/subjects.entity';
import { Day } from '../days/days.entity';
import { WeekType } from '../week-types/week-types.entity';
import { Subgroup } from '../subgroups/subgroups.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Teacher, { eager: true })
  @JoinColumn()
  teacher: Teacher;

  @ManyToOne(() => Subject, { eager: true })
  @JoinColumn()
  subject: Subject;

  @ManyToOne(() => LessonType, { eager: true })
  @JoinColumn()
  lessonType: LessonType;

  @ManyToOne(() => LessonTime, { eager: true })
  @JoinColumn()
  lessonTime: LessonTime;

  @ManyToOne(() => Classroom, { eager: true, nullable: true })
  @JoinColumn()
  classroom: Classroom;

  @ManyToOne(() => Day, { eager: true })
  @JoinColumn()
  day: Day;

  @ManyToOne(() => WeekType, { eager: true })
  @JoinColumn()
  weekType: WeekType;

  @ManyToOne(() => Subgroup, { eager: true }) // MANY TO MANY
  @JoinColumn()
  subgroup: Subgroup;
}
