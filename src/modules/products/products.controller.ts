import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/guards/AuthGuard';
import productsData from '../../products.json';
// import { Product } from './entities/products.entity';
// import { CloudinaryService } from 'src/common/cloudinary.service';
import { CloudinaryService } from '../../common/cloudinary.service'; //! Cambiado para pruebas.
import { FileInterceptor } from '@nestjs/platform-express';
// import { FileValidatorPipe } from 'src/pipes/fileValidator.pipe';
import { FileValidatorPipe } from '../../pipes/fileValidator.pipe'; //! Cambiado para pruebas.
// import { Roles } from 'src/decorators/roles.decorator';
import { Roles } from '../../decorators/roles.decorator'; //! Cambiado para pruebas.
import { Role } from '../auth/roles.enum';
import { RolesGuard } from '../users/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  // ApiExcludeEndpoint,
  ApiForbiddenResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProductsDto } from './dtos/productsDto';
import { ProductsApiDto } from './dtos/productsApiDto';
import { UpdateProductDto } from './dtos/UpdateProductDto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // @ApiExcludeEndpoint()
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Seed of products creation' })
  @ApiResponse({
    status: 201,
    description: 'The products has been successfully created.',
    type: ProductsApiDto,
  })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('seeder')
  seedProducts() {
    return this.productsService.addProducts(productsData);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
    type: ProductsApiDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createProduct(@Body() product: ProductsDto) {
    return this.productsService.createProduct(product);
  }

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'The products has been successfully retrieved.',
    type: ProductsDto,
  })
  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    const pageNum = page ? Number(page) : 1;
    const limitNum = limit ? Number(limit) : 5;

    return this.productsService.findAll(pageNum, limitNum);
  }

  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully retrieved.',
    type: ProductsApiDto,
  })
  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @ApiOperation({ summary: 'Upload an image for a product' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product',
    type: String,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'The image to upload',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The URL of the uploaded image',
    schema: {
      type: 'object',
      properties: {
        imageUrl: { type: 'string' },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(FileValidatorPipe)
  async uploadProuctImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // const folder = 'M4Images';
    const imageUrl = await this.cloudinaryService.uploadImage(file);
    return this.productsService.updateProductImage(id, imageUrl.secure_url);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Update product' })
  @ApiBody({
    type: ProductsDto,
    description: 'Json strucutre for user object',
  })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully updated.',
    type: ProductsApiDto,
  })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productUpdate: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, productUpdate);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.',
    schema: {
      type: 'string',
      example: '4d2de65f-0f9f-48c2-ae9b-20537e175e12',
    },
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
