import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'El nombre debe ser una cadena de caracteres',
    example: 'Ropa de mujer',
  })
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  @IsNotEmpty({ message: 'No se puede cargar una categoria sin nombre' })
  @Length(3, 40, { message: 'El nombre debe contener entre 6 y 40 caracteres' })
  name: string;
}
