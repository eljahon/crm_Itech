
import { EventsType } from "src/enams";
import { ILANG } from "src/iterfaces";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('new')
export class EventEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string

   @Column('varchar')
   image: string

   @Column('enum',{enum: EventsType,
    default: EventsType.MATERIAL,nullable: true })
    type: EventsType

   @Column("jsonb", { nullable: true })
   title: ILANG

   @Column('jsonb',{ nullable: true })
   content:ILANG

   @Column('varchar', { nullable: true })
   date: string

   @Column('jsonb')
   description:ILANG

   @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   createdAt: Date;
 
   @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   updatedAt: Date;
}