import { IsString, Length } from 'class-validator';
// import { Product } from 'src/modules/products/entities/products.entity';
import { Product } from '../../products/entities/products.entity'; //! Cambiado para pruebas.
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  @IsString()
  @Length(1, 50)
  name: string;

  @OneToMany(() => Product, (product) => product.category, {
    cascade: ['remove'],
  })
  products: Product[];
}
