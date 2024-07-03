import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'El ID del usuario, debe ser un UUID válido',
    example: '87cecae9-fb7c-4046-a878-1aabcdb83f29',
  })
  @IsUUID('4', { message: 'El ID debe ser un UUID válido' })
  id: string;

  @ApiProperty({
    description:
      'El nombre debe ser una cadena de caracteres, debe tener entre 3 y 80 caracteres.',
    example: 'Juan Pérez',
    required: true,
  })
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description:
      'El correo electrónico del usuario, debe ser un email válido con una longitud entre 6 y 50 caracteres',
    example: 'example@test.com',
  })
  @IsEmail({}, { message: 'El correo electronico no es valido' })
  @Length(6, 50, { message: 'El email debe tener entre 6 y 50 caracteres' })
  email: string;

  // @ApiProperty({
  //   description:
  //     'La contraseña del usuario, debe ser una cadena de caracteres con una longitud entre 8 y 15 caracteres y debe cumplir con ciertos criterios de complejidad',
  //   example: 'Password123!',
  // })
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @MinLength(8, { message: 'La contraseña debe tener entre 8 y 15 caracteres' })
  @MaxLength(15, {
    message: 'La contraseña debe tener entre 8 y 15 caracteres',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
    message:
      'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
  })
  password: string;

  // @ApiProperty({
  //   description: 'Repite la contraseña para validación',
  //   example: 'Password123!',
  // })
  @IsString()
  rePassword: string;

  @ApiProperty({
    description:
      'El teléfono del usuario, debe ser un número entero con una longitud entre 7 y 15 dígitos',
    example: '123456789',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El teléfono debe ser un número entero' })
  @Min(1000000, { message: 'El teléfono debe tener al menos 7 dígitos' })
  @Max(999999999999999, {
    message: 'El teléfono debe tener como máximo 15 dígitos',
  })
  phone?: number | undefined;

  @ApiProperty({
    description:
      'El país del usuario, debe ser una cadena de caracteres con una longitud entre 5 y 20 caracteres',
    example: 'Argentina',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El país debe ser una cadena de caracteres' })
  @Length(5, 20, { message: 'El país debe tener entre 5 y 20 caracteres' })
  country?: string | undefined;

  @ApiProperty({
    description:
      'La dirección del usuario, debe ser una cadena de caracteres con una longitud entre 3 y 80 caracteres',
    example: 'Av. 9 de Julio s/n, C1043 CABA',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de caracteres' })
  @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 caracteres' })
  address?: string | undefined;

  @ApiProperty({
    description:
      'La ciudad del usuario, debe ser una cadena de caracteres con una longitud entre 5 y 20 caracteres',
    example: 'Buenos Aires',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La ciudad debe ser una cadena de caracteres' })
  @Length(5, 20, { message: 'La ciudad debe tener entre 5 y 20 caracteres' })
  city?: string | undefined;

  @ApiProperty({
    description:
      'Indica si el usuario es administrador, no se debe enviar en el body',
    example: false,
    required: false,
  })
  @IsEmpty()
  isAdmin: boolean;

  @ApiProperty({
    description: 'Fecha de creación del usuario, generado automaticamente',
    example: '16/07/2024',
  })
  createdAt: string;
}
