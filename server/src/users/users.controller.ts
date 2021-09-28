import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(
    @Body("username") username: string,
    @Body("password") password: string
  ) {
    if (!username || !password) {
      return 'Invalid body to post request'
    }
    const results = await this.usersService.insertUser(username, password);
    return results;
  }
}
