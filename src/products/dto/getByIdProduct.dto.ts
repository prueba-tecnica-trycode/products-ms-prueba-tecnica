import { IsString, IsUUID } from 'class-validator';

export class GetByIdProductDto {
  @IsString()
  @IsUUID()
  id: string;
}
