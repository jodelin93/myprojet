import { Module } from '@nestjs/common';
import{TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/reports.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserInterceptor } from './users/interceptors/current.user.interceptor';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      type:"mysql",
      database:"car_value",
      entities:[User,Report],
      synchronize:true,
      username:"root",
      password:"jodelin"
    }
  ), UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService,
             ],
})
export class AppModule {}
