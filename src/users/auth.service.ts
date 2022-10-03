import { Injectable ,BadRequestException,NotFoundException} from '@nestjs/common';
import { UsersService } from './users.service';
import {randomBytes,scrypt as _scrypt} from 'crypto'
import {promisify} from 'util'

const scrypt= promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService:UsersService){}
    
    async signin(email:string, password:string){
        const user=await this.userService.findOneByEmail(email)
        if(!user){
            throw new NotFoundException(email+"not be found")  
        }
        const [salt,storeHash] =user.password.split(".");
        const hash= (await scrypt(password,salt,32)) as Buffer;

        if(storeHash===hash.toString('hex')){
            return user;
        }else{
            throw new BadRequestException("password incorrect")
        }

    }


    async signup(email:string, password:string){
        const user=await this.userService.findOneByEmail(email)
    
        if(user){
            throw new BadRequestException(email+" alredy in use")  
        }
        const salt= randomBytes(8).toString('hex') ;
        const hash= (await scrypt(password,salt,32)) as Buffer;
        const result =salt+"."+hash.toString("hex");

        return this.userService.createUser(email,result)

    }
}
