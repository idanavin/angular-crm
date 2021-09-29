import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/users.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

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

    throw new UnauthorizedException("Password incorrect");
  }

  async login(user: User) {
    const payload = {
      name: user.username,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
