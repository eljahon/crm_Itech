import {Module } from '@nestjs/common'
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/databse.module';
import { EventModule } from './api/events/event.module';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './api/users/users.module';
// import { ProductModule } from './api/product/product.module';
import { RolesModule } from './api/roles/roles.module';
import { SeedengModule } from './api/seedeng/seedeng.module';
@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname,'../../'),
            serveStaticOptions: {
				redirect: false,
				index: false
			}
          }),
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            envFilePath: [`.env.${process.env.NODE_ENV}`],

        }),
        DatabaseModule,
        UsersModule,
        AuthModule,
        RolesModule,
        SeedengModule
        // SeedengModule
        
    ],
    controllers: [AppController],
    // providers: [SeedingService]

})
export class AppModule { }