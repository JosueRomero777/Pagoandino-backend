import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './resources/auth/auth.module';
import { UserModule } from './resources/user/user.module';
import { CustomerModule } from './resources/customer/customer.module';
import { ProductModule } from './resources/product/product.module';
import { OrderModule } from './resources/order/order.module';
import { InvoiceModule } from './resources/invoice/invoice.module';
import { PaymentModule } from './resources/payment/payment.module';
import { SubscriptionModule } from './resources/subscription/subscription.module';

import { InventoryLogModule } from './resources/inventory-log/inventory-log.module';
import { ReturnModule } from './resources/return/return.module';
import { AdressModule } from './resources/adress/adress.module';
import { AuditLogModule } from './resources/audit-log/audit-log.module';

@Module({
  imports: [AuthModule, UserModule, CustomerModule, ProductModule, OrderModule, InvoiceModule, PaymentModule, SubscriptionModule, InventoryLogModule, ReturnModule, AdressModule, AuditLogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
