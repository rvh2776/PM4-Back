import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async addCategories(categories: { name: string }[]): Promise<void> {
    for (const category of categories) {
      const existingCategory = await this.categoriesRepository.findOne({
        where: { name: category.name },
      });
      if (!existingCategory) {
        await this.categoriesRepository.save(category);
      }
    }
  }

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async createCategory(category: CreateCategoryDto) {
    const newCategoy = await this.categoriesRepository.findOne({
      where: { name: category.name },
    });

    if (!newCategoy) {
      return await this.categoriesRepository.save(category);
    }
    return `La categoria: ${newCategoy.name} ya existe: `;
  }

  async updateCategory(id: string, categoryUpdate: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOne({ where: { id } });

    category.name = categoryUpdate.name;
    await this.categoriesRepository.save(category);

    return { category };
  }

  async deleteCategory(id: string) {
    const categoryDetlete = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!categoryDetlete) {
      throw new NotFoundException(`La categoria con id: ${id} no existe`);
    }

    if (categoryDetlete.products.length > 0) {
      throw new NotFoundException(
        `La categoria: ${categoryDetlete.name} tiene productos asociados, no se puede eliminar`,
      );
    }

    await this.categoriesRepository.delete(id);

    return `The category: ${categoryDetlete.name} has been successfully deleted.`;
  }
}
