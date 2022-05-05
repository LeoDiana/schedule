import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WeekType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
