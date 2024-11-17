import { registerDecorator } from 'class-validator';
import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './roles.entity';
import { PaginationResult } from 'src/commons/paginations';
import { CreateRoleDto } from './dto';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository:Repository<RoleEntity>
    ){}

    async findAll(query):Promise<PaginationResult<RoleEntity>   > {
        const { page, pageSize } = query;
        const [data, total] = await this.roleRepository.findAndCount({
            skip: (page - 1) * pageSize,
            take: pageSize
        })
        const pageCount = Math.ceil(total / pageSize)

        const result:PaginationResult<RoleEntity> = {   
            data,
            meta:{
                page,
                pageSize,
                pageCount,
                total
            }
        }
        return result
    }

    async findOne(id:string):Promise<RoleEntity|HttpException> {
        const role = await this.roleRepository.findOneBy({id})
        if(!role) throw new HttpException('Role not found',HttpStatus.NOT_FOUND)
        return role
    }

    async create(data:CreateRoleDto):Promise<RoleEntity> {
        return await this.roleRepository.save(data)
    }

    async update(id:string,data:RoleEntity):Promise<RoleEntity|HttpException> {
         await this.findOne(id)
         await this.roleRepository.update(id,data)
        return await this.findOne(id)
    }  
    
    async delete(id:string):Promise<RoleEntity|HttpException> {
       const data = await this.findOne(id)
        await this.roleRepository.delete(id)
        return data
    }
}
