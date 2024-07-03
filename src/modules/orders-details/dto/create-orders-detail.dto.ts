import { IsNumber, IsUUID } from 'class-validator';

export class CreateOrdersDetailDto {
  @IsUUID('4', { message: 'El ID debe ser un UUID válido' })
  id: string;

  @IsNumber()
  price: number;
}
