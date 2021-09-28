import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { userSchema } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Users', schema: userSchema}])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
