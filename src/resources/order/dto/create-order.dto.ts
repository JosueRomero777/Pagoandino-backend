import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, IsDate, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  customerId: string;

  @ApiProperty({ example: '2024-03-20T10:00:00Z', required: false })
  @IsDate()
  @IsOptional()
  date?: Date;

  @ApiProperty({ example: 100.00 })
  @IsNumber()
  subtotal: number;

  @ApiProperty({ example: 12.00 })
  @IsNumber()
  tax: number;

  @ApiProperty({ example: 112.00 })
  @IsNumber()
  total: number;

  @ApiProperty({ example: 'PENDING' })
  @IsString()
  status: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
