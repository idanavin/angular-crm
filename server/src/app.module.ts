import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { EmployeeModule } from "./employee/employee.module";
import { database } from "../.env";

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${database.USERNAME}:${database.PASSWORD}@crm.a2amk.mongodb.net/${database.DATABASE}?retryWrites=true&w=majority`
    ),
    AuthModule,
    UsersModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
