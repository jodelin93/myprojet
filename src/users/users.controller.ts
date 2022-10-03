import { Body, Controller, Session, Post, UseInterceptors,ClassSerializerInterceptor, Get,UseGuards } from '@nestjs/common';
import { UserDto } from 'src/dtos/user.dto';
import { UserGuard } from 'src/guards/user.guard';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current.user.decorator';
import { CurrentUserInterceptor } from './interceptors/current.user.interceptor';
import { User } from './user.entity';
import { UsersService } from './users.service';


@Controller('auth')
export class UsersController {
    constructor(private authservice:AuthService,private userService:UsersService){}

    @Post("/signup")
    @UseInterceptors(ClassSerializerInterceptor)
    async signup(@Body() body:UserDto,@Session() session:any){
       const user= await this.authservice.signup(body.email,body.password)
       session.userId=user.id;
       return user;
    }

    @Post("/signin")
    @UseInterceptors(ClassSerializerInterceptor)
    async signin(@Body() body:UserDto,@Session() session:any){
       const user=await this.authservice.signin(body.email,body.password)
       session.userId=user.id;
       return user;
        
    }

    @Get()
    @UseGuards(UserGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    whoami(@CurrentUser() user:User){
        return user;
    }


    @Get("/signout")
    async signout(@Session() session:any){
        session.userId=null;
        
    }

    

    // @Delete("/:id")
    // delete(@Param("id") id:number){
    //     this.userService.delete(id)
    // }

    @Get("/test")
    find(@CurrentUser() user:User){
        return user;
    }
}
