import { Body, Controller, Delete, Get, Param, Post, UseInterceptors,ClassSerializerInterceptor } from '@nestjs/common';
import { UserDto } from 'src/dtos/user.dto';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';


@Controller('auth')
export class UsersController {
    constructor(private authservice:AuthService){}

    @Post("/signup")
    @UseInterceptors(ClassSerializerInterceptor)
    createUser(@Body() body:UserDto){
       return this.authservice.signup(body.email,body.password)
        
    }

    // @Get("/:id")
    // @UseInterceptors(ClassSerializerInterceptor)
    // findOne(@Param("id") id:number){
    //     return this.userService.findOne(id);
    // }

    // @Delete("/:id")
    // delete(@Param("id") id:number){
    //     this.userService.delete(id)
    // }

    // @Get()
    // find(){
    //     return this.userService.find();
    // }
}
