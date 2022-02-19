import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccessOption } from '@/entity/access-option.entity';

@Entity()
export class Invite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ default: false })
  used: boolean;

  @ManyToOne(() => AccessOption)
  @JoinColumn()
  accessOption: AccessOption;
}
