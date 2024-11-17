import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsInt, IsOptional, IsString, Max, Min, registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { Transform } from 'class-transformer';
import { SortOrder } from '../../../enams';
export function IsStringOrStringArray(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isStringOrStringArray',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            if (typeof value === 'string') {
              return true;
            }
            if (Array.isArray(value) && value.every(item => typeof item === 'string')) {
              return true;
            }
            return false;
          },
          defaultMessage(args: ValidationArguments) {
            return `$property must be either a string or an array of strings`;
          },
        },
      });
    };
  }
export class EventQueryDto {
    @Transform(({ value }) => parseInt(value))
    @ApiProperty({
      required: false,
      default: 1,
      description: 'Page number',
    })
    @IsOptional()
    @IsInt({ message: 'Page number must be an integer' })
    @Min(1)
    page: number = 1;
  
    @Transform(({ value }) => parseInt(value))
    @ApiProperty({
      required: false,
      default: 10,
      description: 'Page size',
    })
    @IsOptional()
    @IsInt({ message: 'Page size must be an integer' })
    @Min(1)
    @Max(100)
    pageSize: number = 10;

    @IsOptional()
    
    @ApiProperty({required: false, description: 'types new, event video,material'})
    types: string[]
  
    @ApiProperty({
      required: false,
      default: 'id',
      description: 'Order by',
    })
    @IsOptional()
    @IsString({ message: 'Sort by must be a string' })
    orderBy: string = 'id';
  
    @ApiProperty({
      required: false,
      default: 'ASC',
      description: 'Order direction',
      enum: SortOrder,
    })
    @IsOptional()
    @IsEnum(SortOrder, { message: 'Sort direction must be ASC or DESC' })
    sortBy: SortOrder = SortOrder.ASC;
  }