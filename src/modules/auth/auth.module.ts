import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { OrdersDetail } from '../orders-details/entities/orders-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrdersDetail]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  exports: [],
})
export class AuthModule {}
