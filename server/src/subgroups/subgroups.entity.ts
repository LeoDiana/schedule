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

  @Column({ nullable: true })
  name?: string;

  @Column()
  studentsNumber: number;

  @ManyToOne(() => Group, { eager: true })
  @JoinColumn()
  group: Group;
}
