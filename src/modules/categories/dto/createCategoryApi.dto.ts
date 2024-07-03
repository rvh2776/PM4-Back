import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsString, Length } from 'class-validator';

export class createCategoryApi {
  @ApiProperty({
    example: '87cecae9-fb7c-4046-a878-1aabcdb83f22',
  })
  id: string;

  @ApiProperty({
    description: 'El nombre debe ser una cadena de caracteres',
    example: 'Ropa de mujer',
  })
  name: string;
}
