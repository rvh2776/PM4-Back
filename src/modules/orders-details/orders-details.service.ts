import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersDetail } from './entities/orders-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersDetailsService {
  constructor(
    @InjectRepository(OrdersDetail)
    private ordersDetailsService: Repository<OrdersDetail>,
  ) {}

  async findAll() {
    const orderDetail = await this.ordersDetailsService.find({
      relations: ['order.user', 'products'],
    });

    const out = orderDetail.map((detail) => {
      return {
        orderId: detail.order.id,
        date: detail.order.date,
        user: detail.order.user.name,
        userId: detail.order.user.id,
        ordenDetailId: detail.id,
        price: detail.price,
        products: detail.products,
      };
    });

    return out;
  }

  async findOne(id: string) {
    const orderDetail = await this.ordersDetailsService.findOne({
      where: { id },
      relations: ['order.user', 'products'],
    });

    if (!orderDetail) {
      throw new NotFoundException(
        `El detalle de la orden con id: ${id} no existe`,
      );
    }

    return {
      orderId: orderDetail.order.id,
      date: orderDetail.order.date,
      user: orderDetail.order.user.name,
      userId: orderDetail.order.user.id,
      ordenDetailId: orderDetail.id,
      price: orderDetail.price,
      products: orderDetail.products,
    };
  }
}
