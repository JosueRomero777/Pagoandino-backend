import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async getAllRoles() {
    return this.prisma.role.findMany({
      include: {
        permissions: {
          include: {
            permission: true
          }
        }
      }
    });
  }

  async getRole(id: string) {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: {
            permission: true
          }
        }
      }
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async createRole(createRoleDto: CreateRoleDto) {
    const existingRole = await this.prisma.role.findUnique({
      where: { name: createRoleDto.name }
    });

    if (existingRole) {
      throw new ConflictException(`Role with name ${createRoleDto.name} already exists`);
    }

    const role = await this.prisma.role.create({
      data: {
        name: createRoleDto.name,
        description: createRoleDto.description,
        permissions: {
          create: createRoleDto.permissions.map(permissionName => ({
            permission: {
              connect: {
                name: permissionName
              }
            }
          }))
        }
      },
      include: {
        permissions: {
          include: {
            permission: true
          }
        }
      }
    });

    return role;
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.getRole(id);

    if (updateRoleDto.name && updateRoleDto.name !== role.name) {
      const existingRole = await this.prisma.role.findUnique({
        where: { name: updateRoleDto.name }
      });

      if (existingRole) {
        throw new ConflictException(`Role with name ${updateRoleDto.name} already exists`);
      }
    }

    const updatedRole = await this.prisma.role.update({
      where: { id },
      data: {
        name: updateRoleDto.name,
        description: updateRoleDto.description,
        permissions: updateRoleDto.permissions ? {
          deleteMany: {},
          create: updateRoleDto.permissions.map(permissionName => ({
            permission: {
              connect: {
                name: permissionName
              }
            }
          }))
        } : undefined
      },
      include: {
        permissions: {
          include: {
            permission: true
          }
        }
      }
    });

    return updatedRole;
  }

  async deleteRole(id: string) {
    const role = await this.getRole(id);

    await this.prisma.role.delete({
      where: { id }
    });

    return { message: 'Role deleted successfully' };
  }

  async assignRole(assignRoleDto: AssignRoleDto) {
    const { userId, roleId } = assignRoleDto;

    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const role = await this.getRole(roleId);

    await this.prisma.userRoleAssignment.create({
      data: {
        user: { connect: { id: userId } },
        role: { connect: { id: roleId } }
      }
    });

    return { message: 'Role assigned successfully' };
  }

  async removeRole(userId: string, roleId: string) {
    const userRole = await this.prisma.userRoleAssignment.findFirst({
      where: {
        userId,
        roleId
      }
    });

    if (!userRole) {
      throw new NotFoundException(`User role not found`);
    }

    await this.prisma.userRoleAssignment.delete({
      where: {
        id: userRole.id
      }
    });

    return { message: 'Role removed successfully' };
  }

  async getUserRoles(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user.roles.map(userRole => userRole.role);
  }

  async getUserPermissions(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const permissions = new Set();
    user.roles.forEach(userRole => {
      userRole.role.permissions.forEach(rolePermission => {
        permissions.add(rolePermission.permission);
      });
    });

    return Array.from(permissions);
  }

  async assignPermission(roleId: string, permissionName: string) {
    const role = await this.getRole(roleId);

    const permission = await this.prisma.permission.findUnique({
      where: { name: permissionName }
    });

    if (!permission) {
      throw new NotFoundException(`Permission with name ${permissionName} not found`);
    }

    await this.prisma.rolePermission.create({
      data: {
        role: { connect: { id: roleId } },
        permission: { connect: { name: permissionName } }
      }
    });

    return this.getRole(roleId);
  }

  async removePermission(roleId: string, permissionName: string) {
    const role = await this.getRole(roleId);

    const rolePermission = await this.prisma.rolePermission.findFirst({
      where: {
        roleId,
        permission: {
          name: permissionName
        }
      }
    });

    if (!rolePermission) {
      throw new NotFoundException(`Role permission not found`);
    }

    await this.prisma.rolePermission.delete({
      where: {
        id: rolePermission.id
      }
    });

    return this.getRole(roleId);
  }
} 