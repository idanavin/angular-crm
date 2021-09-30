import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UsersService } from "src/users/users.service";
import { Employee } from "./employee.model";

@Injectable()
export class EmployeeService {
  constructor(
    private usersService: UsersService,
    @InjectModel("Employees") private readonly employeeModel: Model<Employee>
  ) {}

  async checkIsAdmin(id: string): Promise<boolean> {
    const user = await this.usersService.getUserById(id);
    return user.is_admin;
  }

  async insertUser(params) {
    const employeeParams = this.getEmployeeFromParams(params);
    const newEmployee = new this.employeeModel({
      ...employeeParams,
    });
    console.log(newEmployee);

    const result = await newEmployee.save();
    return result.id as string;
  }

  private getEmployeeFromParams(params): Employee {
    if (!params.user_id) {
      throw new BadRequestException("Not valid user id or missing");
    }
    if (!params.name?.first || !params.name?.last) {
      throw new BadRequestException("Employee name missing");
    }
    return params as Employee;
  }
}
