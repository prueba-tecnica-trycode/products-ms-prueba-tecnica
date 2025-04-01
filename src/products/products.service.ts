import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { NATS_CLIENT } from 'src/configs/nats-client.configs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject(NATS_CLIENT) private readonly client: ClientProxy,
  ) {}

  async createProduct(createProductdto: CreateProductDto) {
    try {
      await firstValueFrom(
        this.client.send('getbyid.user.or.admin', {
          id: createProductdto.iduser,
        }),
      );

      const product = this.productRepository.create({
        name: createProductdto.name,
        price: createProductdto.price,
        iduser: createProductdto.iduser,
      });

      await this.productRepository.save(product);

      return product;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new RpcException({
        statusCode: 400,
        message: 'User not found or error in creating product',
      });
    }
  }

  async getByIdProducts(id: string) {
    try {
      await firstValueFrom(
        this.client.send('getbyid.user.or.admin', { id: id }),
      );

      const product = await this.productRepository.find({
        where: { iduser: id },
      });

      return product;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new RpcException({
        statusCode: 404,
        message: 'Product not found or user not found',
      });
    }
  }
}
