import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { CategoriesModule } from '../categories/categories.module';
// import { CloudinaryService } from 'src/common/cloudinary.service';
import { CloudinaryService } from '../../common/cloudinary.service'; //! Cambiado para pruebas.
import { OrdersDetail } from '../orders-details/entities/orders-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([OrdersDetail]),
    CategoriesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, CloudinaryService],
  exports: [],
})
export class ProductsModule {}
