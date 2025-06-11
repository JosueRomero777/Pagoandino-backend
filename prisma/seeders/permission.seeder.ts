import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const permissionCategories = {
  USER_MANAGEMENT: 'User Management',
  CUSTOMER_MANAGEMENT: 'Customer Management',
  PRODUCT_MANAGEMENT: 'Product Management',
  INVENTORY_MANAGEMENT: 'Inventory Management',
  ORDER_MANAGEMENT: 'Order Management',
  INVOICE_MANAGEMENT: 'Invoice Management',
  PAYMENT_MANAGEMENT: 'Payment Management',
  RETURN_MANAGEMENT: 'Return Management',
  REPORT_MANAGEMENT: 'Report Management',
  SYSTEM_SETTINGS: 'System Settings'
};

const defaultPermissions = [
  // User Management
  {
    name: 'CREATE_USER',
    description: 'Can create new users',
    category: permissionCategories.USER_MANAGEMENT
  },
  {
    name: 'READ_USER',
    description: 'Can view user information',
    category: permissionCategories.USER_MANAGEMENT
  },
  {
    name: 'UPDATE_USER',
    description: 'Can update user information',
    category: permissionCategories.USER_MANAGEMENT
  },
  {
    name: 'DELETE_USER',
    description: 'Can delete users',
    category: permissionCategories.USER_MANAGEMENT
  },

  // Customer Management
  {
    name: 'CREATE_CUSTOMER',
    description: 'Can create new customers',
    category: permissionCategories.CUSTOMER_MANAGEMENT
  },
  {
    name: 'READ_CUSTOMER',
    description: 'Can view customer information',
    category: permissionCategories.CUSTOMER_MANAGEMENT
  },
  {
    name: 'UPDATE_CUSTOMER',
    description: 'Can update customer information',
    category: permissionCategories.CUSTOMER_MANAGEMENT
  },
  {
    name: 'DELETE_CUSTOMER',
    description: 'Can delete customers',
    category: permissionCategories.CUSTOMER_MANAGEMENT
  },

  // Product Management
  {
    name: 'CREATE_PRODUCT',
    description: 'Can create new products',
    category: permissionCategories.PRODUCT_MANAGEMENT
  },
  {
    name: 'READ_PRODUCT',
    description: 'Can view product information',
    category: permissionCategories.PRODUCT_MANAGEMENT
  },
  {
    name: 'UPDATE_PRODUCT',
    description: 'Can update product information',
    category: permissionCategories.PRODUCT_MANAGEMENT
  },
  {
    name: 'DELETE_PRODUCT',
    description: 'Can delete products',
    category: permissionCategories.PRODUCT_MANAGEMENT
  },

  // Inventory Management
  {
    name: 'MANAGE_INVENTORY',
    description: 'Can manage inventory',
    category: permissionCategories.INVENTORY_MANAGEMENT
  },
  {
    name: 'VIEW_INVENTORY',
    description: 'Can view inventory',
    category: permissionCategories.INVENTORY_MANAGEMENT
  },

  // Order Management
  {
    name: 'CREATE_ORDER',
    description: 'Can create new orders',
    category: permissionCategories.ORDER_MANAGEMENT
  },
  {
    name: 'READ_ORDER',
    description: 'Can view orders',
    category: permissionCategories.ORDER_MANAGEMENT
  },
  {
    name: 'UPDATE_ORDER',
    description: 'Can update orders',
    category: permissionCategories.ORDER_MANAGEMENT
  },
  {
    name: 'DELETE_ORDER',
    description: 'Can delete orders',
    category: permissionCategories.ORDER_MANAGEMENT
  },

  // Invoice Management
  {
    name: 'CREATE_INVOICE',
    description: 'Can create invoices',
    category: permissionCategories.INVOICE_MANAGEMENT
  },
  {
    name: 'READ_INVOICE',
    description: 'Can view invoices',
    category: permissionCategories.INVOICE_MANAGEMENT
  },
  {
    name: 'UPDATE_INVOICE',
    description: 'Can update invoices',
    category: permissionCategories.INVOICE_MANAGEMENT
  },
  {
    name: 'DELETE_INVOICE',
    description: 'Can delete invoices',
    category: permissionCategories.INVOICE_MANAGEMENT
  },

  // Payment Management
  {
    name: 'PROCESS_PAYMENT',
    description: 'Can process payments',
    category: permissionCategories.PAYMENT_MANAGEMENT
  },
  {
    name: 'VIEW_PAYMENTS',
    description: 'Can view payments',
    category: permissionCategories.PAYMENT_MANAGEMENT
  },

  // Return Management
  {
    name: 'PROCESS_RETURN',
    description: 'Can process returns',
    category: permissionCategories.RETURN_MANAGEMENT
  },
  {
    name: 'VIEW_RETURNS',
    description: 'Can view returns',
    category: permissionCategories.RETURN_MANAGEMENT
  },

  // Report Management
  {
    name: 'VIEW_REPORTS',
    description: 'Can view reports',
    category: permissionCategories.REPORT_MANAGEMENT
  },
  {
    name: 'EXPORT_REPORTS',
    description: 'Can export reports',
    category: permissionCategories.REPORT_MANAGEMENT
  },

  // System Settings
  {
    name: 'MANAGE_SETTINGS',
    description: 'Can manage system settings',
    category: permissionCategories.SYSTEM_SETTINGS
  },
  {
    name: 'VIEW_AUDIT_LOGS',
    description: 'Can view audit logs',
    category: permissionCategories.SYSTEM_SETTINGS
  }
];

const defaultRoles = [
  {
    name: 'SUPER_ADMIN',
    description: 'Super administrador con acceso total al sistema',
    permissions: defaultPermissions.map(p => p.name)
  },
  {
    name: 'ADMIN',
    description: 'Administrador de empresa',
    permissions: [
      'CREATE_USER', 'READ_USER', 'UPDATE_USER',
      'CREATE_CUSTOMER', 'READ_CUSTOMER', 'UPDATE_CUSTOMER',
      'CREATE_PRODUCT', 'READ_PRODUCT', 'UPDATE_PRODUCT',
      'MANAGE_INVENTORY', 'VIEW_INVENTORY',
      'CREATE_ORDER', 'READ_ORDER', 'UPDATE_ORDER',
      'CREATE_INVOICE', 'READ_INVOICE', 'UPDATE_INVOICE',
      'PROCESS_PAYMENT', 'VIEW_PAYMENTS',
      'PROCESS_RETURN', 'VIEW_RETURNS',
      'VIEW_REPORTS', 'EXPORT_REPORTS',
      'MANAGE_SETTINGS', 'VIEW_AUDIT_LOGS'
    ]
  },
  {
    name: 'MANAGER',
    description: 'Gerente',
    permissions: [
      'READ_USER',
      'READ_CUSTOMER',
      'READ_PRODUCT',
      'VIEW_INVENTORY',
      'CREATE_ORDER', 'READ_ORDER', 'UPDATE_ORDER',
      'READ_INVOICE',
      'VIEW_PAYMENTS',
      'VIEW_RETURNS',
      'VIEW_REPORTS', 'EXPORT_REPORTS'
    ]
  },
  {
    name: 'CASHIER',
    description: 'Cajero',
    permissions: [
      'READ_CUSTOMER',
      'READ_PRODUCT',
      'VIEW_INVENTORY',
      'CREATE_ORDER', 'READ_ORDER',
      'CREATE_INVOICE', 'READ_INVOICE',
      'PROCESS_PAYMENT', 'VIEW_PAYMENTS',
      'PROCESS_RETURN', 'VIEW_RETURNS'
    ]
  },
  {
    name: 'INVENTORY_MANAGER',
    description: 'Gestor de inventario',
    permissions: [
      'READ_PRODUCT',
      'MANAGE_INVENTORY', 'VIEW_INVENTORY',
      'VIEW_REPORTS'
    ]
  },
  {
    name: 'ACCOUNTANT',
    description: 'Contador',
    permissions: [
      'READ_CUSTOMER',
      'READ_PRODUCT',
      'READ_ORDER',
      'READ_INVOICE',
      'VIEW_PAYMENTS',
      'VIEW_RETURNS',
      'VIEW_REPORTS', 'EXPORT_REPORTS'
    ]
  },
  {
    name: 'VIEWER',
    description: 'Usuario con acceso de solo lectura',
    permissions: [
      'READ_USER',
      'READ_CUSTOMER',
      'READ_PRODUCT',
      'VIEW_INVENTORY',
      'READ_ORDER',
      'READ_INVOICE',
      'VIEW_PAYMENTS',
      'VIEW_RETURNS',
      'VIEW_REPORTS'
    ]
  }
];

async function createSuperAdminUser() {
  try {
    // Primero creamos una compañía de prueba
    const company = await prisma.company.upsert({
      where: { ruc: '9999999999001' },
      update: {},
      create: {
        name: 'Compañía de Prueba',
        ruc: '9999999999001',
        businessName: 'Compañía de Prueba S.A.',
        tradeName: 'Compañía de Prueba',
        address: 'Dirección de Prueba',
        phone: '0999999999',
        email: 'contacto@companiaprueba.com',
        environment: 'PRUEBAS'
      }
    });

    // Encriptamos la contraseña
    const hashedPassword = await bcrypt.hash('Zhayxcoo123', 10);

    // Creamos el usuario super admin
    const superAdmin = await prisma.user.upsert({
      where: { email: 'rimero782@gmail.com' },
      update: {},
      create: {
        name: 'Super Administrador',
        email: 'rimero782@gmail.com',
        password: hashedPassword,
        companyId: company.id,
        isActive: true
      }
    });

    // Obtenemos el rol SUPER_ADMIN
    const superAdminRole = await prisma.role.findUnique({
      where: { name: 'SUPER_ADMIN' }
    });

    if (superAdminRole) {
      // Asignamos el rol al usuario
      await prisma.userRoleAssignment.upsert({
        where: {
          userId_roleId: {
            userId: superAdmin.id,
            roleId: superAdminRole.id
          }
        },
        update: {},
        create: {
          userId: superAdmin.id,
          roleId: superAdminRole.id
        }
      });
    }

    console.log('Usuario Super Admin creado exitosamente');
  } catch (error) {
    console.error('Error al crear usuario Super Admin:', error);
  }
}

async function seed() {
  try {
    console.log('Iniciando seeder de permisos y roles...');

    // Crear permisos
    console.log('Creando permisos...');
    for (const permission of defaultPermissions) {
      await prisma.permission.upsert({
        where: { name: permission.name },
        update: permission,
        create: permission
      });
    }

    // Crear roles y asignar permisos
    console.log('Creando roles y asignando permisos...');
    for (const role of defaultRoles) {
      const createdRole = await prisma.role.upsert({
        where: { name: role.name },
        update: { description: role.description },
        create: {
          name: role.name,
          description: role.description
        }
      });

      // Asignar permisos al rol
      for (const permissionName of role.permissions) {
        const permission = await prisma.permission.findUnique({
          where: { name: permissionName }
        });

        if (permission) {
          await prisma.rolePermission.upsert({
            where: {
              roleId_permissionId: {
                roleId: createdRole.id,
                permissionId: permission.id
              }
            },
            update: {},
            create: {
              roleId: createdRole.id,
              permissionId: permission.id
            }
          });
        }
      }
    }

    // Crear usuario super admin
    console.log('Creando usuario Super Admin...');
    await createSuperAdminUser();

    console.log('Seeder ejecutado exitosamente');
  } catch (error) {
    console.error('Error en el seeder:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed(); 