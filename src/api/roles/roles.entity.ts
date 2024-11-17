
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
export interface IPermission {
    [key:string]:boolean
}
@Entity('role')
export class RoleEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string

   @Column('varchar')
   name: string

   @Column('jsonb')
   permission: IPermission[]
   
   @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   createdAt: Date;
 
   @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
   updatedAt: Date;
}