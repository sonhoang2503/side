import {
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsEnum,
  IsDateString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { AppoinmentTimeFrame } from '@appointment.module';
import { Type } from 'class-transformer';

class WeeklyPlan {
  @IsDateString()
  @IsNotEmpty()
  day: Date;

  @IsString()
  @IsNotEmpty()
  @IsEnum(AppoinmentTimeFrame)
  time_frame: AppoinmentTimeFrame;

  @IsString()
  @IsMongoId()
  appointment: string;
}

export class CreateScheduleRequestDto {
  @IsString()
  @IsMongoId()
  doctor: string;

  @IsString()
  @IsNotEmpty()
  begin: Date;

  @IsString()
  @IsNotEmpty()
  end: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => WeeklyPlan)
  plan: [WeeklyPlan];
}
