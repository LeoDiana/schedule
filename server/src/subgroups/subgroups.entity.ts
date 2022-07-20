import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from '../groups/groups.entity';
import { AcademicStatus } from '../academic-statuses/academic-statuses.entity';

@Entity()
export class Subgroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  studentsNumber: number;

  @ManyToOne(() => Group, { eager: true })
  @JoinColumn()
  group: Group;
}
