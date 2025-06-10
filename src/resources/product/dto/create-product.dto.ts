import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Product Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Product description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 100.00 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 50.00 })
  @IsNumber()
  @Min(0)
  cost: number;

  @ApiProperty({ example: 'SKU123' })
  @IsString()
  sku: string;

  @ApiProperty({ example: 100 })
  @IsInt()
  @Min(0)
  stock: number;
}
