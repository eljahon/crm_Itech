import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { AuthLoginDto } from "./dto/auth.login.dto";
import { AuthRegisterDto } from "./dto/auth.registor.dto";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('login') 
    async login (@Body() body:AuthLoginDto) {
        return await this.authService.login(body)
    }
   
    // @Post('register')
    // async register (@Body() body:AuthRegisterDto) {
    //     return await this.authService.register(body)
    // }

    
}