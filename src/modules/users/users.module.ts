import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Order } from '../orders/entities/order.entity';
import { OrdersDetail } from '../orders-details/entities/orders-detail.entity';
import { requiresAuth } from 'express-openid-connect';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrdersDetail]),
  ],
  controllers: [UsersController],
  // providers: [UsersService, UsersRepository],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requiresAuth()).forRoutes('users/auth0/protected');
  }
}
