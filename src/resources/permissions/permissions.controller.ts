import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller('permissions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo permiso' })
  @ApiResponse({ status: 201, description: 'Permiso creado exitosamente' })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los permisos' })
  @ApiResponse({ status: 200, description: 'Lista de permisos obtenida exitosamente' })
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un permiso por ID' })
  @ApiResponse({ status: 200, description: 'Permiso obtenido exitosamente' })
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un permiso' })
  @ApiResponse({ status: 200, description: 'Permiso actualizado exitosamente' })
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(id, updatePermissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un permiso' })
  @ApiResponse({ status: 200, description: 'Permiso eliminado exitosamente' })
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(id);
  }
} 