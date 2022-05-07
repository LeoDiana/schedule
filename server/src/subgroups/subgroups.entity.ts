import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from '../groups/groups.entity';

@Entity()
export class Subgroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  studentsNumber: number;

  @ManyToOne(() => Group)
  @JoinColumn()
  group: Group;
}