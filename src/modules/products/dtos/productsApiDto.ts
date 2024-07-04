import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, MinLength } from 'class-validator';
import { Category } from '../../../modules/categories/entities/category.entity';

export class ProductsApiDto {
  @ApiProperty({
    description: 'El ID del producto, debe ser un UUID válido',
    example: 'ca92b153-ea5b-4226-a6c5-77e1fdb8e018',
  })
  @IsUUID('4', { message: 'El ID debe ser un UUID válido' })
  id: string;

  @ApiProperty({
    description: 'El nombre debe ser una cadena de caracteres',
    example: 'Samsung Odyssey G9',
  })
  @IsString()
  @MinLength(6)
  name: string;

  @ApiProperty({
    description: 'La descripción debe ser una cadena de carácteres',
    example: 'The best monitor in the world',
  })
  @IsString()
  @MinLength(6)
  description: string;

  @ApiProperty({
    description: 'El precio puede ser un número entero o decimal',
    example: '299.99',
    required: true,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'El stock debe ser un número entero',
    example: '11',
    required: true,
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: 'imgUrl debe ser un enlace valido a una imagen',
    example: 'https://exmple-image.webp',
    required: true,
  })
  @IsString()
  imgUrl: string;

  @ApiProperty({
    description: 'Categoria es una relacion a categories',
    example: '7708a9a7-1839-4afc-89ed-9e6f297cc301',
  })
  @IsUUID()
  category: Category;
}
