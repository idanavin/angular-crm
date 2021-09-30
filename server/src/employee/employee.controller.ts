import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {

    constructor(private employeeService: EmployeeService) {}

    //Guard checks if user is admin - after auth
    @UseGuards(JwtAuthGuard)
    @Post()
    async addEmployee(@Request() req, @Body() body: Employee) {
        const employeeId = await this.employeeService.insertUser(body)
        

        return employeeId
    }
}
