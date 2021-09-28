import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import variables from "../.env";

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${variables.USERNAME}:${variables.PASSWORD}@crm.a2amk.mongodb.net/${variables.DATABASE}?retryWrites=true&w=majority`
    ),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
