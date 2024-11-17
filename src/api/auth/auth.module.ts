import { forwardRef, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
// import { UsersService } from "../users/users.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "src/constants";
@Module({
    imports: [
        UsersModule,
 JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
      global: true,
    }),
    ],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule {}