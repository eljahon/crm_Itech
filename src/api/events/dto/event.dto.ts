
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { VALLANG } from "./lang.dto";
import { EventsType } from 'src/enams';

 class EventDto {
    @IsString()
    @IsNotEmpty({message: 'image shuould not be provided'})
    @ApiProperty()
    image: string

    @ValidateNested()
     @Type(() => VALLANG)
     @ApiProperty({type:VALLANG, example:{  
        uz: "Sarlavha O'zbekcha",
        en: "Title in English",
        ru: "Заголовок на русском"}})
      title:VALLANG

      @IsNotEmpty()
      @IsEnum(EventsType, {message: 'new , meeting, event'})
      @ApiProperty({
        description: 'The type new , meeting, event',
        enum: EventsType,
        example: EventsType.MATERIAL,
      })
      type:EventsType
      
      @ValidateNested()
      @Type(() => VALLANG)
      @ApiProperty({type: VALLANG, example:{  
        uz: "tavsifi O'zbekcha",
        en: "description in English",
        ru: "описание на русском"}})
        description:VALLANG

        @IsString()
        @IsNotEmpty()
        @ApiProperty({example:'17.03.2024'})
        date: string
        
        @ValidateNested()
      @Type(() => VALLANG)
      @ApiProperty({type: VALLANG, example:{  
        uz: `<p>mazmuni O'zbekcha</p>`,
        en: `<p>content in English</p>`,
        ru: `<p>содержание на русском</p>`}})
        content:VALLANG

        
}

export default EventDto