import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class orderApiDto {
  @ApiProperty({
    example: '87cecae9-fb7c-4046-a878-1aabcdb83f22',
  })
  id: string;

  @ApiProperty({
    description: 'Fecha de creación de la orden, generado automaticamente',
    example: '16/07/2024',
  })
  date: Date;

  @ApiProperty({
    description: 'El ID del usuario, debe ser un UUID válido',
    example: '87cecae9-fb7c-4046-a878-1aabcdb83f29',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'ID del producto, debe ser un UUID válido',
    example: { id: '87cecae9-fb7c-4046-a878-1aabcdb83f29', price: '239.30' },
  })
  orderDetail: { id: string }[];
}
