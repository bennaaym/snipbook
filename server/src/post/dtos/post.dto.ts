import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

class Image {
  @IsString()
  @IsNotEmpty()
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
  @Type(() => String)
  tags: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Image)
  images: Image[];
}

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  message: string;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  tags: string[];
}
