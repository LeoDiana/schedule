import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Building } from '../buildings/buildings.entity';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  capacity: number;

  @ManyToOne(() => Building)
  @JoinColumn()
  building: Building;
}
