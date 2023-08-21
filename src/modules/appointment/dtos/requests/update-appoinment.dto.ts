import { AppointmentStatus } from '../../enums/appointment.enum';
import { CreateAppointmentRequestDto } from './create-appoinment.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsMongoId,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateAppointmentRequestDto extends PartialType(
  CreateAppointmentRequestDto,
) {
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsBoolean()
  is_confirm?: boolean;

  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus;
}
