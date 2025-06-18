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

  @ApiProperty({ example: 500.5, description: 'Peso en gramos', required: false })
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiProperty({ example: '123456789', description: 'Código de barras', required: false })
  @IsString()
  @IsOptional()
  barcode?: string;

  @ApiProperty({ example: 'PROD_ABC123', description: 'Código QR único', required: false })
  @IsString()
  @IsOptional()
  qrCode?: string;

  @ApiProperty({ example: 'CAT001', description: 'ID de categoría', required: false })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({ example: 10, description: 'Stock mínimo', required: false })
  @IsInt()
  @IsOptional()
  minStock?: number;

  @ApiProperty({ example: 1000, description: 'Stock máximo', required: false })
  @IsInt()
  @IsOptional()
  maxStock?: number;
}
