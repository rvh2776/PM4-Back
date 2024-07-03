import { PartialType } from '@nestjs/mapped-types';
import { ProductsDto } from './productsDto';

export class UpdateProductDto extends PartialType(ProductsDto) {}
