import { AutoMap } from '@automapper/classes';
import { UserDepartment, UserMinDto } from '@user.module';
import { AbstractDto } from '@dtos';

import {
  AppoinmentTimeFrame,
  AppointmentStatus,
} from '../enums/appointment.enum';

export class AppointmentDto extends AbstractDto {
  @AutoMap(() => UserMinDto)
  user: string;

  @AutoMap(() => UserMinDto)
  doctor: string;

  @AutoMap()
  description: string;

  @AutoMap(() => String)
  department: UserDepartment;

  @AutoMap(() => String)
  time_frame: AppoinmentTimeFrame;

  @AutoMap()
  appointment_day: string;

  @AutoMap(() => String)
  status: AppointmentStatus;

  @AutoMap(() => Boolean)
  is_confirm: boolean;
}
