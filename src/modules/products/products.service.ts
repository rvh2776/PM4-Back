import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
import { UpdateProductDto } from './dtos/UpdateProductDto';
import { ProductsDto } from './dtos/productsDto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private categoriesService: CategoriesService,
  ) {}

  async addProducts(products: any[]): Promise<void> {
    const categories = await this.categoriesService.getCategories();

    for (const product of products) {
      const category = categories.find((cat) => cat.name === product.category);
      if (category) {
        const existingProduct = await this.productsRepository.findOne({
          where: { name: product.name },
        });
        if (!existingProduct) {
          const newProduct = this.productsRepository.create({
            ...product,
            category: category,
          });
          await this.productsRepository.save(newProduct);
        }
      }
    }
  }

  async findAll(page: number, limit: number) {
    const [result, total] = await this.productsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      count: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getProductById(id: string) {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`El producto con id: ${id} no existe`);
      // return 'No se encontro el producto';
    }
    return product;
  }

  async createProduct(product: ProductsDto) {
    return await this.productsRepository.save(product);
  }

  async updateProductImage(id: string, secure_url: string) {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`El producto con id: ${id} no existe`);
    }

    product.imgUrl = secure_url;
    await this.productsRepository.save(product);

    return product;
  }

  async updateProduct(id: string, productUpdate: UpdateProductDto) {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`El producto con id: ${id} no existe`);
    }

    await this.productsRepository.update(id, productUpdate);

    const updatedProduct = await this.productsRepository.findOne({
      where: { id },
    });

    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const productDelete = await this.productsRepository.findOne({
      where: { id },
      // relations: ['category'],
    });

    if (!productDelete) {
      throw new NotFoundException(`El producto con id: ${id} no existe`);
    }
    await this.productsRepository.delete(productDelete.id);
    return productDelete.id;
  }
}
