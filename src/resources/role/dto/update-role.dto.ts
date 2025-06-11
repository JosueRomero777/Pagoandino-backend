import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({ description: 'Name of the role', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Description of the role', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'List of permission names', required: false, type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  permissions?: string[];
} 