import { Module } from '@nestjs/common';
import { OrdersDetailsService } from './orders-details.service';
import { OrdersDetailsController } from './orders-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersDetail } from './entities/orders-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersDetail])],
  controllers: [OrdersDetailsController],
  providers: [OrdersDetailsService],
  exports: [OrdersDetailsService],
})
export class OrdersDetailsModule {}
