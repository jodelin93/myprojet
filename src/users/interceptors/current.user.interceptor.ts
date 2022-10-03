import { CurrentUser } from './../decorators/current.user.decorator';
import {CallHandler,Injectable,ExecutionContext,NestInterceptor} from "@nestjs/common"
import { UsersService } from "../users.service";


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{

constructor(private userService:UsersService){}

async intercept(context: ExecutionContext, callHandler: CallHandler) {
    const request= context.switchToHttp().getRequest();
    const {userId}= request.session;
    console.log("my ID is "+userId);
    
    if(userId){
        const user= this.userService.findOne(userId);
        request.CurrentUser=user;
    }

    return callHandler.handle();
}


}

