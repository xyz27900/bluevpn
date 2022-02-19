import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessOption } from '@/entity/access-option.entity';
import { Order, OrderType } from '@/entity/order.entity';
import { User } from '@/entity/user.entity';

@Injectable()
export class OrderService {
  private readonly orderRepository: Repository<Order>;

  constructor(@InjectRepository(Order) orderRepository: Repository<Order>) {
    this.orderRepository = orderRepository;
  }

  public createPayment(datetime: Date, accessOption: AccessOption, user: User): Order {
    const order = new Order();
    order.type = OrderType.PAYMENT;
    order.datetime = datetime;
    order.accessOption = accessOption;
    order.user = user;
    return order;
  }

  public createInvite(datetime: Date, accessOption: AccessOption, user: User): Order {
    const order = new Order();
    order.type = OrderType.INVITE;
    order.datetime = datetime;
    order.accessOption = accessOption;
    order.user = user;
    return order;
  }

  public async findByUser(user: User): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { user },
      relations: ['accessOption'],
      order: { datetime: 'DESC' },
    });
  }
}
