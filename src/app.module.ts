import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './resources/auth/auth.module';
import { UserModule } from './resources/user/user.module';
import { CustomerModule } from './resources/customer/customer.module';
import { ProductModule } from './resources/product/product.module';
import { OrderModule } from './resources/order/order.module';
import { InvoiceModule } from './resources/invoice/invoice.module';
import { PaymentModule } from './resources/payment/payment.module';
import { SubscriptionModule } from './resources/subscription/subscription.module';
import { CompanyModule } from './resources/company/company.module';

import { InventoryLogModule } from './resources/inventory-log/inventory-log.module';
import { ReturnModule } from './resources/return/return.module';
import { AdressModule } from './resources/adress/adress.module';
import { AuditLogModule } from './resources/audit-log/audit-log.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './resources/common/filters/http-exception.filter';
import { PermissionsModule } from './resources/permissions/permissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    CustomerModule,
    ProductModule,
    OrderModule,
    InvoiceModule,
    PaymentModule,
    SubscriptionModule,
    CompanyModule,
    InventoryLogModule,
    ReturnModule,
    AdressModule,
    AuditLogModule,
    PermissionsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}