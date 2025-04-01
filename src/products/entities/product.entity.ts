import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'text' })
  iduser: string;
}
