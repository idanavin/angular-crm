import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class EmployeeService {
  constructor(private usersService: UsersService) {}

  async checkIsAdmin(id: string): Promise<boolean> {
    const user = await this.usersService.getUserById(id);
    return user.is_admin;
  }
}
