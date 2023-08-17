import { AutoMap } from '@automapper/classes';
import { AbstractDto } from '@dtos';
import { UserDto } from '@user.module';
import { AppoinmentTimeFrame } from '../enums/appointment.enum';
import { UserDepartment } from '@user.module';

export class AppointmentDto extends AbstractDto {
  @AutoMap(() => UserDto)
  user: UserDto;

  @AutoMap(() => UserDto)
  doctor: UserDto;

  @AutoMap()
  description: string;

  @AutoMap(() => String)
  department: UserDepartment;

  @AutoMap(() => String)
  time_frame: AppoinmentTimeFrame;

  @AutoMap()
  appointment_day: string;
}
