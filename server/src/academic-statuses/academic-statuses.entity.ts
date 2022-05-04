import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AcademicStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;
}
