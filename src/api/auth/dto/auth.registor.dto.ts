
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class AuthRegisterDto {

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
  @MinLength(6)
  @ApiProperty({ example: 'admin!@#' })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ example: '+998901234567' })
  phone: string;

}
