import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
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
  ApiBody,
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
import { UpdateCategoryDto } from './dto/update-category.dto';

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

  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Update categories' })
  @ApiBody({
    description: 'The category has been successfully updated.',
    schema: {
      type: 'string',
      example: { name: 'Ropa de niño' },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully updated.',
    schema: {
      type: 'string',
      example: {
        id: '87cecae9-fb7c-4046-a878-1aabcdb83f22',
        name: 'Ropa de niño',
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() categoryUpdate: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, categoryUpdate);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({
    status: 200,
    description: 'Delete a category.',
    schema: {
      type: 'string',
      example: {
        id: '87cecae9-fb7c-4046-a878-1aabcdb83f22',
        name: 'Ropa de niño',
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteCategory(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
