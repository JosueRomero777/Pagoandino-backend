import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { UserPermission } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @RequirePermissions(UserPermission.CREATE_USER)
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'Role created successfully' })
  @ApiResponse({ status: 409, description: 'Role already exists' })
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Post('assign')
  @RequirePermissions(UserPermission.UPDATE_USER)
  @ApiOperation({ summary: 'Assign a role to a user' })
  @ApiResponse({ status: 201, description: 'Role assigned successfully' })
  @ApiResponse({ status: 404, description: 'User or role not found' })
  assignRole(@Body() assignRoleDto: AssignRoleDto) {
    return this.roleService.assignRole(assignRoleDto);
  }

  @Delete(':userId/:roleId')
  @RequirePermissions(UserPermission.UPDATE_USER)
  @ApiOperation({ summary: 'Remove a role from a user' })
  @ApiResponse({ status: 200, description: 'Role removed successfully' })
  @ApiResponse({ status: 404, description: 'User role not found' })
  removeRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ) {
    return this.roleService.removeRole(userId, roleId);
  }

  @Get('user/:userId')
  @RequirePermissions(UserPermission.READ_USER)
  @ApiOperation({ summary: 'Get all roles for a user' })
  @ApiResponse({ status: 200, description: 'Returns user roles' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserRoles(@Param('userId') userId: string) {
    return this.roleService.getUserRoles(userId);
  }

  @Get('user/:userId/permissions')
  @RequirePermissions(UserPermission.READ_USER)
  @ApiOperation({ summary: 'Get all permissions for a user' })
  @ApiResponse({ status: 200, description: 'Returns user permissions' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserPermissions(@Param('userId') userId: string) {
    return this.roleService.getUserPermissions(userId);
  }

  @Post(':roleId/permissions/:permission')
  @RequirePermissions(UserPermission.MANAGE_SETTINGS)
  @ApiOperation({ summary: 'Assign a permission to a role' })
  @ApiResponse({ status: 201, description: 'Permission assigned successfully' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  assignPermission(
    @Param('roleId') roleId: string,
    @Param('permission') permission: UserPermission,
  ) {
    return this.roleService.assignPermission(roleId, permission);
  }

  @Delete(':roleId/permissions/:permission')
  @RequirePermissions(UserPermission.MANAGE_SETTINGS)
  @ApiOperation({ summary: 'Remove a permission from a role' })
  @ApiResponse({ status: 200, description: 'Permission removed successfully' })
  @ApiResponse({ status: 404, description: 'Role permission not found' })
  removePermission(
    @Param('roleId') roleId: string,
    @Param('permission') permission: UserPermission,
  ) {
    return this.roleService.removePermission(roleId, permission);
  }
} 