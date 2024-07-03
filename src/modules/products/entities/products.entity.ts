import { IsString, Length } from 'class-validator';
// import { Category } from 'src/modules/categories/entities/category.entity';
import { Category } from '../../categories/entities/category.entity'; //! Cambiado para pruebas.
// import { OrdersDetail } from 'src/modules/orders-details/entities/orders-detail.entity';
import { OrdersDetail } from '../../orders-details/entities/orders-detail.entity'; //! Cambiado para pruebas.
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: '50', nullable: false })
  @IsString()
  @Length(1, 50)
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'varchar', nullable: true })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToMany(() => OrdersDetail, (orderDetail) => orderDetail.products, {
    // cascade: ['remove'],
  })
  @JoinTable({
    name: 'order_details_products',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'order_detail_id', referencedColumnName: 'id' },
  })
  orderDetails: OrdersDetail[];
}
