import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('roles')
@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionGuard)
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @RequirePermissions('READ_USER')
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, description: 'Returns all roles' })
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Get(':id')
  @RequirePermissions('READ_USER')
  @ApiOperation({ summary: 'Get a role by id' })
  @ApiResponse({ status: 200, description: 'Returns the role' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  getRole(@Param('id') id: string) {
    return this.roleService.getRole(id);
  }

  @Post()
  @RequirePermissions('CREATE_USER')
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'Role created successfully' })
  @ApiResponse({ status: 409, description: 'Role already exists' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Patch(':id')
  @RequirePermissions('UPDATE_USER')
  @ApiOperation({ summary: 'Update a role' })
  @ApiResponse({ status: 200, description: 'Role updated successfully' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  @RequirePermissions('DELETE_USER')
  @ApiOperation({ summary: 'Delete a role' })
  @ApiResponse({ status: 200, description: 'Role deleted successfully' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  delete(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }

  @Post('assign')
  @RequirePermissions('CREATE_USER')
  @ApiOperation({ summary: 'Assign a role to a user' })
  @ApiResponse({ status: 201, description: 'Role assigned successfully' })
  @ApiResponse({ status: 404, description: 'User or role not found' })
  assignRole(@Body() assignRoleDto: AssignRoleDto) {
    return this.roleService.assignRole(assignRoleDto);
  }

  @Delete(':userId/:roleId')
  @RequirePermissions('DELETE_USER')
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
  @RequirePermissions('READ_USER')
  @ApiOperation({ summary: 'Get all roles for a user' })
  @ApiResponse({ status: 200, description: 'Returns user roles' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserRoles(@Param('userId') userId: string) {
    return this.roleService.getUserRoles(userId);
  }

  @Get('permissions/:userId')
  @RequirePermissions('READ_USER')
  @ApiOperation({ summary: 'Get all permissions for a user' })
  @ApiResponse({ status: 200, description: 'Returns user permissions' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserPermissions(@Param('userId') userId: string) {
    return this.roleService.getUserPermissions(userId);
  }

  @Post(':roleId/permissions/:permissionName')
  @RequirePermissions('CREATE_USER')
  @ApiOperation({ summary: 'Assign a permission to a role' })
  @ApiResponse({ status: 201, description: 'Permission assigned successfully' })
  @ApiResponse({ status: 404, description: 'Role not found' })
  assignPermission(
    @Param('roleId') roleId: string,
    @Param('permissionName') permissionName: string
  ) {
    return this.roleService.assignPermission(roleId, permissionName);
  }

  @Delete(':roleId/permissions/:permissionName')
  @RequirePermissions('DELETE_USER')
  @ApiOperation({ summary: 'Remove a permission from a role' })
  @ApiResponse({ status: 200, description: 'Permission removed successfully' })
  @ApiResponse({ status: 404, description: 'Role permission not found' })
  removePermission(
    @Param('roleId') roleId: string,
    @Param('permissionName') permissionName: string
  ) {
    return this.roleService.removePermission(roleId, permissionName);
  }
} 