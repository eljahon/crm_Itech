import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/users.entity';
import { RoleEntity } from '../roles/roles.entity';  // RoleEntity import
import { hashGenerator } from 'src/utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    private configService: ConfigService
  ) {}

  // Seeding method to populate the database
  async seed() {
    await this.createRoles(); // Create roles first
    await this.createUsers(); // Then create users
  }

  // Create roles
  private async createRoles() {
    console.log('createRoles started')
    const roles = [
      { name: 'SuperAdmin', permission: [{create:true}, {read:true}, {update:true}, {delete:true}] },
      { name: 'Admin', permission: [{create:true}, {read:true}, {update:true}, {delete:true}] },
    
    ];

    for (const role of roles) {
      const existingRole = await this.roleRepository.findOne({ where: { name: role.name } });
      if (!existingRole) {
        await this.roleRepository.save(role);
      }
    }
    console.log('createRoles finished successfully')
  }

  // Create users
  private async createUsers() {
    console.log('createUsers started')
    const roles = await this.roleRepository.find();
    const {super_admin_phone,super_admin_password,admin_phone,admin_password} = this.configService.get('seedeng');
    
    const users = [
      { first_name: 'SuperAdmin', last_name: 'SuperAdmin', password: await hashGenerator(super_admin_password), phone: super_admin_phone, role: roles[0] },
      { first_name: 'Admin', last_name: 'Admin', password: await hashGenerator(admin_password) , phone: admin_phone, role: roles[1] },
    ];

    for (const user of users) {
      const existingUser = await this.userRepository.findOne({ where: { phone: user.phone } });
      if (!existingUser) {
        await this.userRepository.save(user);
      }
    }
    console.log('createUsers finished successfully')
  }
}
