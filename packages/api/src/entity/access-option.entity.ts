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
}
