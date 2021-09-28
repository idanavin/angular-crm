import { Injectable } from "@nestjs/common";
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
}
