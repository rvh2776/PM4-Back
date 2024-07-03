import { Injectable } from '@nestjs/common';
import { CreateOrdersDetailDto } from './dto/create-orders-detail.dto';
import { UpdateOrdersDetailDto } from './dto/update-orders-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersDetail } from './entities/orders-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersDetailsService {
  constructor(
    @InjectRepository(OrdersDetail)
    private ordersDetailsService: Repository<OrdersDetail>,
  ) {}

  async create(orderDetail: CreateOrdersDetailDto) {
    console.log('prueba:', orderDetail);
    return 'This action adds a new ordersDetail';
  }

  async findAll() {
    return `This action returns all ordersDetails`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} ordersDetail`;
  }

  async update(id: number, updateOrdersDetailDto: UpdateOrdersDetailDto) {
    return `This action updates a #${id} ordersDetail`;
  }

  async remove(id: number) {
    return `This action removes a #${id} ordersDetail`;
  }
}
