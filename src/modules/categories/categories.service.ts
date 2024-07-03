import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

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
    // return await this.categoriesRepository.find({ relations: ['products'] });
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
}
