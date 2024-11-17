
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UserDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'johndoe' })
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'uuid of role for roles api' })
  role:string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'admin!@#' })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: '+998901234567' })
  phone: string;

}
export class UserUpdateDto extends UserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'uuid of user' })
  id?: string;
}
