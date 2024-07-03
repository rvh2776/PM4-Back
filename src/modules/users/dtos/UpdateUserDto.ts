import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './UserDto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateUserDto extends PartialType(UserDto) {
  @ApiProperty({
    description:
      'El nombre debe ser una cadena de caracteres, debe tener entre 3 y 80 caracteres.',
    example: 'Juan Pérez',
    required: false,
  })
  @IsString({ message: 'El nombre debe ser una cadena de caracteres' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres' })
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    description: 'El correo electrónico del usuario, debe ser un email válido.',
    example: 'example@test.com',
    required: false,
  })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @Length(6, 50, { message: 'El email debe tener entre 6 y 50 caracteres' })
  email?: string;

  @ApiProperty({
    description:
      'La contraseña debe ser una cadena de caracteres, debe tener entre 8 y 15 caracteres, contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.',
    example: 'Password123!',
    required: false,
  })
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @Length(8, 15, {
    message: 'La contraseña debe tener entre 8 y 15 caracteres',
  })
  password?: string;

  @ApiProperty({
    description: 'Repetir la contraseña.',
    example: 'Password123!',
    required: false,
  })
  @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
  @Length(8, 15, {
    message: 'La contraseña debe tener entre 8 y 15 caracteres',
  })
  rePassword?: string;

  @ApiProperty({
    description: 'El teléfono debe ser un número entero.',
    example: 123456789,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El teléfono debe ser un número entero' })
  @Min(1000000, { message: 'El teléfono debe tener al menos 7 dígitos' })
  @Max(999999999999999, {
    message: 'El teléfono debe tener como máximo 15 dígitos',
  })
  phone?: number;

  @ApiProperty({
    description:
      'El país debe ser una cadena de caracteres, debe tener entre 5 y 20 caracteres.',
    example: 'Argentina',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El país debe ser una cadena de caracteres' })
  @Length(5, 20, { message: 'El país debe tener entre 5 y 20 caracteres' })
  country?: string;

  @ApiProperty({
    description:
      'La dirección debe ser una cadena de caracteres, debe tener entre 3 y 80 caracteres.',
    example: 'Av. 9 de Julio s/n, C1043 CABA',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de caracteres' })
  @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 caracteres' })
  address?: string;

  @ApiProperty({
    description:
      'La ciudad debe ser una cadena de caracteres, debe tener entre 5 y 20 caracteres.',
    example: 'Buenos Aires',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La ciudad debe ser una cadena de caracteres' })
  @Length(5, 20, { message: 'La ciudad debe tener entre 5 y 20 caracteres' })
  city?: string;
}
