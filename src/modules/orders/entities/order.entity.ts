// import { OrdersDetail } from 'src/modules/orders-details/entities/orders-detail.entity';
import { OrdersDetail } from '../../orders-details/entities/orders-detail.entity'; //! Cambiado para pruebas.
// import { User } from 'src/modules/users/entities/users.entity';
import { User } from '../../users/entities/users.entity'; //! Cambiado para pruebas.
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamp', nullable: false })
  date: Date;

  @OneToOne(() => OrdersDetail, (orderDetail) => orderDetail.order, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_detail_id' })
  orderDetail: OrdersDetail;
}
