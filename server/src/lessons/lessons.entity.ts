import {
  Entity,
  JoinColumn,
  ManyToMany,
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

  @ManyToOne(() => Teacher)
  @JoinColumn()
  teacher: Teacher;

  @ManyToOne(() => Subject)
  @JoinColumn()
  subject: Subject;

  @ManyToOne(() => LessonType)
  @JoinColumn()
  lessonType: LessonType;

  @ManyToOne(() => LessonTime)
  @JoinColumn()
  lessonTime: LessonTime;

  @ManyToOne(() => Classroom)
  @JoinColumn()
  classroom: Classroom;

  @ManyToOne(() => Day)
  @JoinColumn()
  day: Day;

  @ManyToOne(() => WeekType)
  @JoinColumn()
  weekType: WeekType;

  @ManyToMany(() => Subgroup)
  @JoinColumn()
  subgroup: Subgroup;
}
