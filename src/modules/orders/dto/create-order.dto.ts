import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsUUID, IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class CreateOrderDto {
  // @IsUUID('4', { message: 'El ID debe ser un UUID válido' })
  // id: string;

  @ApiHideProperty()
  @Column()
  date: Date;

  @ApiProperty({
    description: 'El ID del usuario, debe ser un UUID válido',
    example: '60e5a44e-4fe4-409b-a45c-8b40aaea0f45',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'ID del producto, debe ser un UUID válido',
    example: [
      { id: '0db7c681-b5b8-4216-9d02-038349de6ad6' },
      { id: 'ca92b153-ea5b-4226-a6c5-77e1fdb8e018' },
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  products: { id: string }[];
}
