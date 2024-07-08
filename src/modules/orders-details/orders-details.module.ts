import { Module } from '@nestjs/common';
import { OrdersDetailsService } from './orders-details.service';
import { OrdersDetailsController } from './orders-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersDetail } from './entities/orders-detail.entity';
import { Order } from '../orders/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersDetail]),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrdersDetailsController],
  providers: [OrdersDetailsService],
  exports: [OrdersDetailsService],
})
export class OrdersDetailsModule {}
