import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetByIdProductDto } from './dto/getByIdProduct.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('products.create')
  createProduct(@Payload() createproduct: CreateProductDto) {
    return this.productsService.createProduct(createproduct);
  }

  @MessagePattern('products.getbyid')
  getByIdProducts(@Payload() id: GetByIdProductDto) {
    return this.productsService.getByIdProducts(id.id);
  }
}
