import { Body, Controller, Get, Param, Post } from "@nestjs/common";
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
      return "Invalid body to post request";
    }
    const results = await this.usersService.insertUser(username, password);
    return results;
  }

  @Get(":id")
  async getUser(@Param("id") userId: string) {
    const user = await this.usersService.getUserById(userId);
    return user
  }
}
