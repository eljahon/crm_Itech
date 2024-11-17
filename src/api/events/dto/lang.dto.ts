import { Type } from "class-transformer";
import { IsEmpty, IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator";
export class VALLANG {
    @IsString()
    uz: string;
  
    @IsString()
    ru: string;
  
    @IsString()
    en: string;
  }