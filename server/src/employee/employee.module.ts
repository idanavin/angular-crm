import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { JwtAdminStrategy } from './jwt-admin.strategy';

@Module({
  imports: [UsersModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, JwtAdminStrategy]
})
export class EmployeeModule {}
