import { Injectable } from "@nestjs/common";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validate(username: string, password: string) {
    const user = await this.usersService.getUserByName(username);
    
    if (user && user.password === password) {
      return {
        id: user.id,
        username: user.username,
        is_admin: user.is_admin,
        is_manager: user.is_manager,
        employee_id: user.employee_id && user.employee_id,
      };
    }

    return null
  }
}
