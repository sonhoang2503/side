import { IsNotEmpty, IsString, IsMongoId, IsEnum } from 'class-validator';
import { UserDepartment } from '@user.module';
import { AppoinmentTimeFrame } from '../../enums/appointment.enum';
import { AutoMap } from '@automapper/classes';

export class CreateAppointmentRequestDto {
  @IsString()
  @IsMongoId()
  @AutoMap()
  user: string;

  @IsString()
  @IsMongoId()
  @AutoMap()
  doctor: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsEnum(UserDepartment)
  @AutoMap(() => String)
  department: UserDepartment;

  @IsString()
  @IsEnum(AppoinmentTimeFrame)
  @AutoMap(() => String)
  time_frame: AppoinmentTimeFrame;

  @IsString()
  @AutoMap()
  appointment_day: string;
}
