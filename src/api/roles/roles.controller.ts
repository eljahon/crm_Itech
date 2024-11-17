import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { PaginationResult } from 'src/commons/paginations';
import { PaginationDto } from 'src/commons/paginations';
import { RoleEntity } from './roles.entity';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('roles')
@ApiTags('Roles')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class RolesController {
    constructor(private readonly roleService:RolesService) {}

    @Get()
    async findAll(@Query() query:PaginationDto):Promise<PaginationResult<RoleEntity>|HttpException> {
        return await this.roleService.findAll(query)
    }

    @Get(':id')
    async findOne(@Param('id') id:string):Promise<RoleEntity|HttpException> {
        return await this.roleService.findOne(id)
    }

    @Post()
    @ApiBody({type:CreateRoleDto})
    @ApiResponse({status:201,type:UpdateRoleDto})
    async create(@Body() data:CreateRoleDto):Promise<RoleEntity|HttpException> {
        return await this.roleService.create(data)
    }   

    @Put(':id')
    async update(@Param('id') id:string,@Body() data:RoleEntity):Promise<RoleEntity|HttpException> {
        return await this.roleService.update(id,data)
    }

    @Delete(':id')
    async delete(@Param('id') id:string):Promise<RoleEntity|HttpException> {
        return await this.roleService.delete(id)
    }
}
