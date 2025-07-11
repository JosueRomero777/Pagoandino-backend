import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'Name of the role' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the role', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'List of permission names', type: [String] })
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
} 