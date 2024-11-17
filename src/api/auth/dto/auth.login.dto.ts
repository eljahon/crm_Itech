import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty()
  @ApiProperty({ example: '+998901234567' })
  phone: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'admin!@#$%^&*()' })
  password: string;
}
