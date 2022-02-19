import { UserModel } from '@xyz27900/bluevpn-common/dist/cjs/models/user.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hash: string;

  @Column({ type: 'timestamptz', nullable: true })
  expireDate: Date | null;

  public toJSON(): UserModel {
    return {
      id: this.id,
      uuid: this.uuid,
      email: this.email,
      expireDate: this.expireDate?.toISOString() ?? null,
    };
  }
}
