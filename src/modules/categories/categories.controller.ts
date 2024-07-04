import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import productsData from '../../products.json';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthGuard } from '../auth/guards/AuthGuard';
import {
  ApiBearerAuth,
  // ApiExcludeEndpoint,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { createCategoryApi } from './dto/createCategoryApi.dto';
// import { Roles } from 'src/decorators/roles.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../users/guards/roles.guard';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // @ApiExcludeEndpoint()
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Seed of categories creation' })
  @ApiResponse({
    status: 201,
    description: 'The categories has been successfully created.',
    type: createCategoryApi,
  })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('seeder')
  seedCategories() {
    const categories = productsData.map((product) => ({
      name: product.category,
    }));
    // Remuevo duplicados
    const uniqueCategories = Array.from(
      new Set(categories.map((c) => c.name)),
    ).map((name) => ({ name }));

    return this.categoriesService.addCategories(uniqueCategories);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully created.',
    type: createCategoryApi,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createCategory(@Body() category: CreateCategoryDto) {
    return this.categoriesService.createCategory(category);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'The categories has been successfully retrieved.',
    type: createCategoryApi,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
