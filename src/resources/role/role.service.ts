import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { UserPermission } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async createRole(data: CreateRoleDto) {
    const existingRole = await this.prisma.role.findUnique({
      where: { name: data.name },
    });

    if (existingRole) {
      throw new ConflictException('Role already exists');
    }

    return this.prisma.role.create({
      data,
    });
  }

  async assignRole(data: AssignRoleDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const role = await this.prisma.role.findUnique({
      where: { id: data.roleId },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return this.prisma.userRoleAssignment.create({
      data: {
        userId: data.userId,
        roleId: data.roleId,
      },
    });
  }

  async removeRole(userId: string, roleId: string) {
    const userRole = await this.prisma.userRoleAssignment.findFirst({
      where: {
        userId,
        roleId,
      },
    });

    if (!userRole) {
      throw new NotFoundException('User role not found');
    }

    return this.prisma.userRoleAssignment.delete({
      where: {
        id: userRole.id,
      },
    });
  }

  async getUserRoles(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.roles.map((ur) => ur.role);
  }

  async getUserPermissions(userId: string): Promise<UserPermission[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const permissions = new Set<UserPermission>();
    user.roles.forEach((ur) => {
      ur.role.permissions.forEach((p) => {
        permissions.add(p.permission);
      });
    });

    return Array.from(permissions);
  }

  async assignPermission(roleId: string, permission: UserPermission) {
    const role = await this.prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return this.prisma.rolePermission.create({
      data: {
        roleId,
        permission,
      },
    });
  }

  async removePermission(roleId: string, permission: UserPermission) {
    const rolePermission = await this.prisma.rolePermission.findFirst({
      where: {
        roleId,
        permission,
      },
    });

    if (!rolePermission) {
      throw new NotFoundException('Role permission not found');
    }

    return this.prisma.rolePermission.delete({
      where: {
        id: rolePermission.id,
      },
    });
  }
} 