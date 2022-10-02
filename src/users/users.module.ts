import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import{TypeOrmModule} from "@nestjs/typeorm";
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { AuthService } from './auth.service';


@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService],
  controllers: [UsersController]
})
export class UsersModule {}
