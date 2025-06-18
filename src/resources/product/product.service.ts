import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateWeightDto } from './dto/update-weight.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    // Generar código QR único si no se proporciona
    const qrCode = createProductDto.qrCode || `PROD_${uuidv4().replace(/-/g, '').substring(0, 12)}`;
    
    // Preparar datos para la creación
    const productData = {
      ...createProductDto,
      qrCode,
    };

    // Si categoryId está vacío o es null, removerlo para evitar errores de FK
    if (!productData.categoryId || productData.categoryId === '') {
      delete productData.categoryId;
    }

    // Si minStock no está definido, usar 0 por defecto
    if (productData.minStock === undefined || productData.minStock === null) {
      productData.minStock = 0;
    }

    console.log('Creating product with data:', productData);
    
    return this.prisma.product.create({
      data: productData,
      include: {
        category: true,
        images: true,
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      where: { isActive: true },
      include: {
        category: true,
        images: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
        inventoryLogs: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  }

  async findByQrCode(qrCode: string) {
    return this.prisma.product.findFirst({
      where: { qrCode, isActive: true },
      include: {
        category: true,
        images: true,
        inventoryLogs: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    // Preparar datos para la actualización
    const updateData = { ...updateProductDto };

    // Si categoryId está vacío o es null, removerlo para evitar errores de FK
    if (!updateData.categoryId || updateData.categoryId === '') {
      delete updateData.categoryId;
    }

    // Si minStock no está definido, usar 0 por defecto
    if (updateData.minStock === undefined || updateData.minStock === null) {
      updateData.minStock = 0;
    }

    console.log('Updating product with data:', updateData);

    return this.prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        images: true,
      },
    });
  }

  async updateWeight(updateWeightDto: UpdateWeightDto) {
    const { productId, weight } = updateWeightDto;
    
    return this.prisma.product.update({
      where: { id: productId },
      data: { weight },
      include: {
        category: true,
        images: true,
      },
    });
  }

  async remove(id: string) {
    // Soft delete - marcar como inactivo en lugar de eliminar
    return this.prisma.product.update({
      where: { id },
      data: { 
        isActive: false,
        deletedAt: new Date(),
      },
    });
  }

  async getInventoryLogs(productId: string) {
    return this.prisma.inventoryLog.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}
