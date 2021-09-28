import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

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

  async getSingleUser(userId: string): Promise<User> {
    const user = await this.findUserById(userId);
    return {
      id: user.id,
      username: user.username,
      is_admin: user.is_admin,
      is_manager: user.is_manager,
      employee_id: user.employee_id && user.employee_id
    }
  }

  private async findUserById(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!user) {
      throw new NotFoundException('Could not find product.');
    }
    return user;
  }
}
