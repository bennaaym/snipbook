import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

class Image {
  url: string;
}

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  message: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  tags: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  images: Image[];
}
