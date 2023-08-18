import { AutoMap } from '@automapper/classes';
import { AbstractDto } from '@dtos';
// import { UserDto } from '@user.module';
import { SchemaTypes } from 'mongoose';

import { AppoinmentTimeFrame } from '../enums/appointment.enum';
import { UserDepartment } from '@user.module';

export class AppointmentDto extends AbstractDto {
  @AutoMap(() => SchemaTypes.ObjectId)
  user: string;

  @AutoMap(() => SchemaTypes.ObjectId)
  doctor: string;

  @AutoMap()
  description: string;

  @AutoMap(() => String)
  department: UserDepartment;

  @AutoMap(() => String)
  time_frame: AppoinmentTimeFrame;

  @AutoMap()
  appointment_day: string;
}
