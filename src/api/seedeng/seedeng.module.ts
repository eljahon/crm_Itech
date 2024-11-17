import { Module } from '@nestjs/common';
import { SeederService } from './seedeng.service';
import { RoleEntity } from '../roles/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/users.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity,RoleEntity])
  ],
  providers: [SeederService],
  exports:[SeederService]
})
export class SeedengModule {}
