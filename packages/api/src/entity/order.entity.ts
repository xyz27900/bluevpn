import { OrderModel } from '@xyz27900/bluevpn-common/dist/cjs/models/order.model';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccessOption } from '@/entity/access-option.entity';
import { User } from '@/entity/user.entity';

export enum OrderType {
  PAYMENT = 'PAYMENT',
  INVITE = 'INVITE',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: OrderType })
  type: OrderType;

  @Column({ type: 'timestamptz' })
  datetime: Date;

  @ManyToOne(() => AccessOption)
  @JoinColumn()
  accessOption: AccessOption;

  @ManyToOne(() => User)
  user: User;

  public toJSON(): OrderModel {
    return {
      id: this.id,
      type: this.type.toLowerCase() as Lowercase<OrderType>,
      datetime: this.datetime.toISOString(),
      amount: this.accessOption.price,
      description: this.accessOption.description,
    };
  }
}
