import {
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsEnum,
  IsOptional,
  IsArray,
} from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ResultStatus } from '../../enums/result.enum';

export class CreateResultRequestDto {
  @IsString()
  @IsMongoId()
  @AutoMap()
  appointment: string;

  @IsString()
  @IsNotEmpty()
  symptom: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  conclusion: string;

  @IsOptional()
  @IsString()
  @IsEnum(ResultStatus)
  @AutoMap(() => String)
  status: ResultStatus;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @AutoMap()
  images: [string];
}
