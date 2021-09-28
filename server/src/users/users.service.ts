import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel("Users") private readonly userModel: Model<User>) {}

  async insertUser(username: string, password: string) {
    const newProduct = new this.userModel({
      username,
      password,
      is_admin: false,
      is_manager: false,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      username: user.username,
      is_admin: user.is_admin,
      is_manager: user.is_manager,
      employee_id: user.employee_id && user.employee_id,
    };
  }

  async getUserByName(username: string): Promise<User> {
    const user = await this.findUser(null, username);
    return user as User;
  }

  private async findUser(id: string = null, username: string = null): Promise<User> {
    let user;
    try {
      if (id) {
        user = await this.userModel.findById(id).exec();
      }
      if (username) {
        user = await this.userModel.findOne({ username: username }).exec(); 
      }
    } catch (error) {
      throw new NotFoundException("Could not find user.");
    }
    if (!user) {
      throw new NotFoundException("Could not find user.");
    }
    return user;
  }
}
