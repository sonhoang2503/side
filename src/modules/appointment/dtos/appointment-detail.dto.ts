import { AutoMap } from '@automapper/classes';
import { AbstractDto } from '@dtos';
import { UserDto } from '@user.module';
import { AppoinmentTimeFrame } from '../enums/appointment.enum';
import { UserDepartment } from '@user.module';

export class AppointmentDetailDto extends AbstractDto {
  @AutoMap(() => UserDto)
  user: UserDto;

  @AutoMap(() => UserDto)
  doctor: UserDto;

  @AutoMap()
  description: string;

  @AutoMap()
  department: string;

  @AutoMap()
  time_frame: string;

  @AutoMap()
  appointment_day: string;
}
