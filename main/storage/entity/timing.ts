import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { Activity } from './activity';

@Entity()
export class Timing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @ManyToOne(() => Activity, activity => activity.timings)
  activity: Activity;
}
