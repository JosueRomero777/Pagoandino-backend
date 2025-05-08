export class CreateOrderDto {
  customerId: string;
  date?: Date;
  total: number;
  status: string;
  isActive?: boolean;
}
