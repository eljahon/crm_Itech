import { IsArray, IsNotEmpty,IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { IPermission } from "../roles.entity";

export class CreateRoleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string 
    
    @ApiProperty({type:[], description:'permission', example:[{create:true},{read:true},{update:true},{delete:true}]})
    @IsNotEmpty()
    @IsArray()
    permission:IPermission[]
}

export class UpdateRoleDto extends CreateRoleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id:string
}