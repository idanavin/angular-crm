import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Employee } from './employee.model';

@Controller('employee')
export class EmployeeController {

    //Guard checks if user is admin - after auth
    @UseGuards(JwtAuthGuard)
    @Post()
    async addEmployee(@Request() req, @Body() body: Employee) {
        console.log(typeof(body));
        

        return req.user
    }
}
