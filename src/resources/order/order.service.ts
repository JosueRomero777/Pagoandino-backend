import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
  
    return this.prisma.order.create({
     data:createOrderDto,
      
    });
  }

  async findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  async remove(id: string) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
