import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      include: {
        products: {
          where: { isActive: true },
          select: { id: true, name: true }
        },
        children: {
          where: { isActive: true },
          select: { id: true, name: true }
        }
      },
      orderBy: { name: 'asc' }
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          where: { isActive: true },
          select: { id: true, name: true, sku: true, price: true, stock: true }
        },
        children: {
          where: { isActive: true },
          select: { id: true, name: true }
        },
        parent: {
          select: { id: true, name: true }
        }
      }
    });

    if (!category) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    // Verificar que la categoría existe
    await this.findOne(id);

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
      include: {
        products: {
          where: { isActive: true },
          select: { id: true, name: true }
        },
        children: {
          where: { isActive: true },
          select: { id: true, name: true }
        }
      }
    });
  }

  async remove(id: string) {
    // Verificar que la categoría existe
    await this.findOne(id);

    // Soft delete - marcar como inactiva en lugar de eliminar
    return this.prisma.category.update({
      where: { id },
      data: { isActive: false },
    });
  }
} 