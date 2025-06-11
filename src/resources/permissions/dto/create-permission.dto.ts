import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ description: 'Nombre del permiso' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Descripción del permiso' })
  @IsString()
  @IsNotEmpty()
  description: string;
} 