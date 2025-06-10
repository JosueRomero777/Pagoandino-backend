import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'ADMIN' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Administrador del sistema', required: false })
  @IsString()
  @IsOptional()
  description?: string;
} 