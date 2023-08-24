import { AutoMap } from '@automapper/classes';
import { AbstractDto } from '@dtos';
import { AppointmentDto } from '@appointment.module';

import { ResultStatus } from '../enums/result.enum';

export class ResultDto extends AbstractDto {
  @AutoMap(() => AppointmentDto)
  appointment: AppointmentDto;

  @AutoMap()
  symptom: string;

  @AutoMap()
  description: string;

  @AutoMap()
  conclusion: string;

  @AutoMap(() => String)
  status: ResultStatus;

  @AutoMap(() => [String])
  images: [string];
}
