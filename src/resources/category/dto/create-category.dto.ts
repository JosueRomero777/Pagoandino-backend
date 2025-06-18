import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Nombre de la categoría', example: 'Electrónicos' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descripción de la categoría', example: 'Productos electrónicos y tecnología', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'ID de la categoría padre (para subcategorías)', required: false })
  @IsOptional()
  @IsUUID()
  parentId?: string;
} 