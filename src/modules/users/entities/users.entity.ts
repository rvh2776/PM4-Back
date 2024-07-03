import { IsNumber, IsString, Length } from 'class-validator';
// import { Order } from 'src/modules/orders/entities/order.entity';
import { Order } from '../../orders/entities/order.entity'; //! Cambiado para pruebas.
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  @IsString()
  @Length(1, 50)
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  @IsString()
  @Length(1, 50)
  email: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  @IsString()
  @Length(1, 60)
  password: string;

  @Column({ type: 'bigint', nullable: true })
  @IsNumber()
  phone?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsString()
  @Length(1, 50)
  country?: string;

  @Column({ type: 'text', nullable: true })
  @IsString()
  address?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsString()
  @Length(1, 50)
  city?: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column()
  createdAt: string;

  @OneToMany(() => Order, (order) => order.user, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
  })
  orders: Order[];
}
