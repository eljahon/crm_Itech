
import { Column, CreateDateColumn, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoleEntity } from "../roles/roles.entity";
import { IsNotEmpty } from "class-validator";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@Entity('user')
export class UserEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string

   @Column('varchar')
   first_name: string

   @Column('varchar')
   last_name: string

   @Column('varchar')
   password: string

   @ManyToOne(()=>RoleEntity, { onDelete: 'SET NULL', nullable: true })
   @JoinColumn()
   role:RoleEntity

   @Column('varchar')
   phone: string
   @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   createdAt: Date;
 
   @UpdateDateColumn()
   updatedAt: Date;
}