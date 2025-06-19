import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Environment } from './environment.enum';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ruc: string;

  @IsString()
  @IsNotEmpty()
  businessName: string;

  @IsString()
  @IsOptional()
  tradeName?: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsEnum(Environment)
  @IsOptional()
  environment?: Environment;

  @IsString()
  @IsOptional()
  accountingBook?: string;

  @IsBoolean()
  @IsOptional()
  retentionAgent?: boolean;

  @IsBoolean()
  @IsOptional()
  specialTaxpayer?: boolean;

  @IsString()
  @IsOptional()
  accountingSystem?: string;

  @IsString()
  @IsOptional()
  establishmentCode?: string;

  @IsString()
  @IsOptional()
  emissionPoint?: string;

  @IsString()
  @IsOptional()
  digitalSignature?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;
} 