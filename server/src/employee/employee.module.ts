import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { EmployeeController } from './employee.controller';
import { employeeSchema } from './employee.model';
import { EmployeeService } from './employee.service';
import { JwtAdminStrategy } from './jwt-admin.strategy';

@Module({
  imports: [UsersModule, MongooseModule.forFeature([{name: 'Users', schema: employeeSchema}])],
  controllers: [EmployeeController],
  providers: [EmployeeService, JwtAdminStrategy]
})
export class EmployeeModule {}
