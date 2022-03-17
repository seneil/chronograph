import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';

// eslint-disable-next-line import/no-cycle
import { Category } from './category';
// eslint-disable-next-line import/no-cycle
import { Timing } from './timing';

// https://github.com/typeorm/typeorm/blob/master/docs/faq.md#how-to-use-typeorm-in-esm-projects

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, category => category.activities)
  category: Category;

  @OneToMany(() => Timing, timing => timing.activity)
  timings: Timing[];
}
