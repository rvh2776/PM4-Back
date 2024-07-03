// import { Order } from 'src/modules/orders/entities/order.entity';
import { Order } from '../../orders/entities/order.entity'; //! Cambiado para pruebas.
// import { Product } from 'src/modules/products/entities/products.entity';
import { Product } from '../../products/entities/products.entity'; //! Cambiado para pruebas.
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'orderDetails',
})
export class OrdersDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetail, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'order_details_products',
    joinColumn: { name: 'order_detail_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[];
}
