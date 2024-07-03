import { Injectable } from '@nestjs/common';
import { ProductsDto } from './dtos/productsDto';
// import { UpdateProductDto } from './dtos/UpdateProductDto';

@Injectable()
export class ProductsRepository {
  private products: ProductsDto[] = [
    // {
    //   id: '1',
    //   name: 'Camiseta de algodón',
    //   description: 'Camiseta básica de algodón para hombre',
    //   price: 15.99,
    //   stock: 10,
    //   imgUrl: 'https://ejemplo.com/camiseta.jpg',
    // },
    // {
    //   id: '2',
    //   name: 'Pantalones vaqueros',
    //   description: 'Pantalones vaqueros ajustados para mujer',
    //   price: 29.99,
    //   stock: 10,
    //   imgUrl: 'https://ejemplo.com/pantalones.jpg',
    // },
    // {
    //   id: '3',
    //   name: 'Zapatillas deportivas',
    //   description: 'Zapatillas deportivas con suela de goma',
    //   price: 49.99,
    //   stock: 10,
    //   imgUrl: 'https://ejemplo.com/zapatillas.jpg',
    // },
  ];

  // async findAll(page: number, limit: number): Promise<ProductsDto[]> {
  //   const startIndex = (page - 1) * limit;
  //   const endIndex = startIndex + limit;

  //   return this.products.slice(startIndex, endIndex);
  // }

  // async getProductId(id: number) {
  //   const product = this.products.find((product) => product.id === id);

  //   if (!product) {
  //     return 'No se encontro el producto';
  //   }

  //   return product;
  // }

  // async createProduct(product: ProductsDto) {
  //   const id = this.products.length + 1;
  //   this.products = [...this.products, { id, ...product }];
  //   return id;
  // }

  // async updateProduct(id: number, productUpdate: UpdateProductDto) {
  //   const productIndex = this.products.findIndex(
  //     (product) => product.id === id,
  //   );

  //   if (productIndex === -1) {
  //     return 'Producto no encontrado';
  //   }

  //   const product = this.products[productIndex];
  //   const updatedProduct = { ...product, ...productUpdate, id };
  //   this.products[productIndex] = updatedProduct;
  //   return updatedProduct.id;
  // }

  // deleteProduct(id: number) {
  //   const productIndex = this.products.findIndex(
  //     (product) => product.id === id,
  //   );

  //   if (productIndex === -1) {
  //     return 'El producto no existe';
  //   }

  //   const productDelete = this.products[productIndex];
  //   this.products.splice(productIndex, 1);

  //   return productDelete.id;
  // }
}
