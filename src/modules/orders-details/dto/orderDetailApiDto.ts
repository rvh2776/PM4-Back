import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class orderDetailApiDto {
  @ApiProperty({
    description: 'El ID de la orden, debe ser un UUID válido',
    example: '87cecae9-fb7c-4046-a878-1aabcdb83f22',
  })
  orderId: string;

  @ApiProperty({
    description: 'Fecha de creación de la orden, generado automaticamente',
    example: '2024-07-08T15:18:44.772Z',
  })
  date: Date;

  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'Juan Perez',
  })
  user: string;

  @ApiProperty({
    description: 'El ID del usuario, debe ser un UUID válido',
    example: '87cecae9-fb7c-4046-a878-1aabcdb83f29',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'El ID del detalle de la orden debe ser un UUID válido',
    example: '87cecae9-fb7c-4046-a878-1aabcdb83f29',
  })
  @IsUUID()
  orderDetailId: string;

  @ApiProperty({
    example: '200.98',
  })
  price: string;

  @ApiProperty({
    description: 'Array de productos',
    example: [
      {
        id: '62677dec-ccdb-493c-b614-28997b9ce472',
        name: 'Razer BlackWidow V3',
        description: 'The best keyboard in the world',
        price: 99.99,
        stock: 10,
        imgUrl: 'http://example-image.webp',
      },
      {
        id: 'd7ddbafb-4bc5-4b2e-ab5c-1ae61e99b80a',
        name: 'Pantalon elastizado mujer',
        description: 'Pantalon elastizado varios colores, mujer',
        price: 170.23,
        stock: 6,
        imgUrl: 'http://example-image.webp',
      },
    ],
  })
  @IsArray()
  products: [];
}
