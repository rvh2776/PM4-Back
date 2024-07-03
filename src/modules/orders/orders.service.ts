import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../users/entities/users.entity';
import { OrdersDetail } from '../orders-details/entities/orders-detail.entity';
import { Product } from '../products/entities/products.entity';

// import { OrdersDetailsService } from '../orders-details/orders-details.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsReppository: Repository<Product>,
    @InjectRepository(OrdersDetail)
    private ordersDetailsRepository: Repository<OrdersDetail>,
    // private ordersDetailsService: OrdersDetailsService,
  ) {}

  async addOrder(createOrder: CreateOrderDto) {
    const { userId, products } = createOrder;
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      return 'El usuario no existe';
    }

    const orderDetail = new OrdersDetail();
    orderDetail.price = 0;
    orderDetail.products = [];

    let total = 0;

    for (const productOrder of products) {
      const product = await this.productsReppository.findOne({
        where: { id: productOrder.id },
      });

      if (!product || product.stock <= 0) {
        return `El producto con id ${productOrder.id} no está disponible`;
      }

      orderDetail.products.push(product);
      total += product.price;
      product.stock -= 1;

      await this.productsReppository.save(product);
    }

    orderDetail.price = total;
    await this.ordersDetailsRepository.save(orderDetail);
    // await this.ordersDetailsService.create(orderDetail);

    const order = new Order();
    order.user = user;
    order.date = new Date();
    order.orderDetail = orderDetail;

    await this.orderRepository.save(order);

    return {
      orderId: order.id,
      total: orderDetail.price,
      orderDetailId: orderDetail.id,
    };
  }

  async findAll() {
    const orders = await this.orderRepository.find({
      relations: ['orderDetail', 'orderDetail.products'],
    });

    return orders;
  }

  async getOrder(id: string): Promise<Order | string> {
    const order = await this.orderRepository.findOne({
      where: { id },
      // relations: ['orderDetail', 'orderDetail.products', 'user'],
      relations: ['orderDetail', 'orderDetail.products'],
    });

    if (!order) {
      return 'La orden no existe';
    }

    return order;
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
