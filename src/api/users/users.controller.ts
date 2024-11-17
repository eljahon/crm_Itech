import { BadGatewayException, Body, Controller, Delete, ExecutionContext, Get, Param, Post, Put, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/commons/paginations';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserDto, UserUpdateDto } from './dto/user.dto';
import { UserEntity } from './users.entity';
// import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard)
@ApiBearerAuth()

export class UsersController {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UsersService
    ) { }
    @Get()
  
    async findAll(@Query() query: PaginationDto) {
        return await this.userService.findAll(query)
    }
    @Get('/me')
 
    async userMe(@Request() request) {

        const token = this.extractTokenFromHeader(request);
        if (!token) throw new UnauthorizedException()

        const payload = await this.jwtService.verifyAsync(token, {
            secret: jwtConstants.secret,
        });

        return await this.userService.findById(payload.id)

    }

    @Get(':id')
    async findOne(@Param() id: string) {
        return await this.userService.findById(id)
    }

    @Post()
    @ApiResponse({
        status: 200,
        description: 'Create user',
        type: UserUpdateDto
    })
    async create(@Body() data: UserDto): Promise<UserEntity> {

        return await this.userService.create(data)
    }

    @Delete(':id')
    async remove(@Param() id: string) {
        return await this.userService.remove(id)
    }

    @Put(':id')


    async update(@Param() id: string, @Body() data: UserDto): Promise<UserEntity> {

        if (!id) throw new BadGatewayException('id is require place id send /:id')

        return await this.userService.update(id, data)
    }


    private extractTokenFromHeader(request): string | undefined {

        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}
