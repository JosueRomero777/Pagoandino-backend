import { Module } from '@nestjs/common';
import { InventoryLogService } from './inventory-log.service';
import { InventoryLogController } from './inventory-log.controller';

@Module({
  controllers: [InventoryLogController],
  providers: [InventoryLogService],
})
export class InventoryLogModule {}
