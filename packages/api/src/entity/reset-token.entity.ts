import { DateTime } from 'luxon';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '@/entity/user.entity';

@Entity()
export class ResetToken {
  @Column({ primary: true })
  token: string;

  @Column({ type: 'timestamptz' })
  expireDate: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  public get luxonExpireDate(): DateTime {
    return DateTime.fromJSDate(this.expireDate);
  }
}
