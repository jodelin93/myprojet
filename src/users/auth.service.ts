import { Injectable ,BadRequestException} from '@nestjs/common';
import { UsersService } from './users.service';
import {randomBytes,scrypt as _scrypt} from 'crypto'
import {promisify} from 'util'

const scrypt= promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService:UsersService){}
    
    signin(){

    }


    async signup(email:string, password:string){
        const user=await this.userService.findOneByEmail(email)
        console.log(user);
        
        if(user){
            throw new BadRequestException(email+" alredy in use")  
        }
        const salt= randomBytes(8).toString('hex') ;
        const hash= (await scrypt(password,salt,32)) as Buffer;
        const result =salt+"."+hash.toString("hex");

        return this.userService.createUser(email,result)

    }
}
