import { Type } from 'class-transformer';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './event.entity';
import { In, Repository } from 'typeorm';
import { PaginationDto, PaginationResult } from 'src/commons/paginations';
import EventDto from './dto/event.dto';
import { EventQueryDto } from './dto/pagiantion.dto';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly newRepository: Repository<EventEntity>
    ){}

    async findAll(query:EventQueryDto): Promise<PaginationResult<EventEntity>> {
        const { page, pageSize, types } = query;
        const [data, total] = await this.getPaginatedItemsFromDatabase(page, pageSize, types)
        const pageCount = Math.ceil(total / pageSize)

        const result: PaginationResult<EventEntity> = {
            data,
            meta: {
                page,
                pageSize,
                pageCount,
                total
            }
        }
        return result
    }
     
    async findOne (id:string):Promise<EventEntity> {
        const newEntity = await this.newRepository.findOne({where:{id}})
        if(!newEntity) throw new BadGatewayException('new item not found')
        return newEntity;
    }

     async create (data:EventDto): Promise<EventEntity> {
        const item = this.newRepository.create(data)
        return await this.newRepository.save(item)
     }

     async remove (id:string):Promise<EventEntity> {
        const newEntityRemove = await this.newRepository.findOne({where:{id}})
        if(!newEntityRemove) throw new BadGatewayException('new item not found by id')
            await this.newRepository.delete(id)
        return newEntityRemove
     }

     async updata(id:string, data:EventDto):Promise<EventEntity> {
        
        const newEntityCheck = await this.newRepository.findOne({where:{id}})

        if(!newEntityCheck) throw new BadGatewayException('new item not found by id')
        
        await this.newRepository.update(id, data as unknown as EventEntity)
           
        return await this.newRepository.findOne({where:{id}});
     }
     
    async getPaginatedItemsFromDatabase(page: number, pageSize: number, types:string[]): Promise<[EventEntity[], number]> {
        let where = types ? {type: Array.isArray(types) ?  In(types) : types} : undefined;
        console.log(typeof types, '===>>')
        const items = await this.newRepository.find({
            skip: (page - 1) * pageSize,
            take: pageSize,
            where
        });

        const total = await this.newRepository.count();

        return [items, total];
    }
}
