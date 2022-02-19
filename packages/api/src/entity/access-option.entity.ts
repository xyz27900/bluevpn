import { AccessOptionModel } from '@xyz27900/bluevpn-common/dist/cjs/models/access-option.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AccessOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  /* Amount in ETH */
  price: string;

  @Column()
  /* Duration in seconds */
  duration: number;

  @Column()
  description: string;

  @Column({ default: false })
  highlighted: boolean;

  public toJSON(): AccessOptionModel {
    return {
      id: this.id,
      price: this.price,
      duration: this.duration,
      description: this.description,
      highlighted: this.highlighted,
    };
  }
}
