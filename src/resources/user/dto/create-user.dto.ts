export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'USER';
  isActive?: boolean;
}
