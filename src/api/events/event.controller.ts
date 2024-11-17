import { EventEntity } from './event.entity';
import { PaginationResult } from '../../commons/paginations';

import { BadGatewayException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { PaginationDto } from 'src/commons/paginations';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import NewDto from './dto/event.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { EventQueryDto } from './dto/pagiantion.dto';

@Controller('events')
@ApiTags('events')
export class EventController {
    constructor(private readonly newSercive: EventService){}
    @Get()
    async findAll(@Query() query:EventQueryDto):Promise<PaginationResult<EventEntity>>{
        return await this.newSercive.findAll(query)
    }

    @Get(':id') 
    async findOne (@Param('id') id:string){
        return await this.newSercive.findOne(id)
    }

    @Post() 
    @ApiBody({type: NewDto})
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async create (@Body() data:NewDto):Promise<EventEntity> {
        return await this.newSercive.create(data)
    }
    @Delete(':id')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async remove(@Param('id') id:string) :Promise<EventEntity> {
        return await this.newSercive.remove(id)
    }

    @Put(':d') 
    async update(@Param('id') id:string ,@Body() data:NewDto){
        if(!id) throw new BadGatewayException('updata new id require place id give me /:id')
      return await this.newSercive.updata(id, data)
    }
}
