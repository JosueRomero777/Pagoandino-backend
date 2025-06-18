import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateWeightDto {
  @ApiProperty({ example: 'product-uuid-here', description: 'ID del producto' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 500.5, description: 'Peso en gramos' })
  @IsNumber()
  weight: number;
} 