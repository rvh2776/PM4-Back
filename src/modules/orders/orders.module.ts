import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/users.entity';
import { OrdersDetail } from '../orders-details/entities/orders-detail.entity';
import { Product } from '../products/entities/products.entity';
// import { OrdersDetailsModule } from '../orders-details/orders-details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([OrdersDetail]),
    TypeOrmModule.forFeature([Product]),
    // OrdersDetailsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, UsersService],
})
export class OrdersModule {}
