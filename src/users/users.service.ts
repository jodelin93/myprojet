import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import {Repository} from 'typeorm'
import {InjectRepository} from "@nestjs/typeorm";



@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo:Repository<User>){}

    createUser(email:string,password:string){
        const user=this.repo.create({email,password})
       return this.repo.save(user);
    }

    async findOne(num:number){
        if(!num){
            num=0;
        }
        const user=await this.repo.findOneBy({id:num})
        return user;
    }

    async findOneByEmail(email:string){
        return await this.repo.findOneBy({email});
    }

    find(){
        return this.repo.find({select:{
            email:true
        }})
    }

    delete(id:number){
     
        this.repo.delete(id)
    }
}
