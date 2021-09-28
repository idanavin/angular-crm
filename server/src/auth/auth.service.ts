import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validate(username: string, password: string) {
    const user = await this.usersService.getUserByName(username);

    if (user && user.password === password) {
      const { password, ...rest } = user;
      return rest;
    }

    return null
  }
}
