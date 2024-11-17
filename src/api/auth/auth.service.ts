import { hashCompare, hashGenerator } from './../../utils/index';
import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from "./dto/auth.login.dto";
import { AuthRegisterDto } from "./dto/auth.registor.dto";
import { UserEntity } from "../users/users.entity";
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService
    ){}
   async login (data:AuthLoginDto) {

    const user = await this.userService.findByPhoneAndPassword({phone:data.phone})
    console.log(user, 'user')

      if(!user) throw new BadRequestException('phone incorrect')

        const hashCompared = await hashCompare(data.password, user.password)

        // if(!hashCompared) throw new BadRequestException('password incorrect')

        const {token} = await this.jwtGenertor(user.id)
        delete user.password ;
        return {
            user,
            token
        }
    }
   async register (data:AuthRegisterDto):Promise<UserEntity> {


        const user = await this.userService.findByPhoneAndPassword({phone:data.phone})

        if(user) throw new BadRequestException('phone already exist')
            
            const hashPassword = await hashGenerator(data.password)

            const itemUser = await this.userService.create({
                ...data,
                password:hashPassword
            })

            delete itemUser.password;

            return itemUser
    }
    async jwtGenertor (id:string) {
    return {
      token: await this.jwtService.signAsync({ id }),
    };
    }
}