import { AutoMap } from '@automapper/classes';
import { AbstractDto } from '@dtos';
import { UserMinDto } from '@user.module';
import { WeeklyPlan } from '../schemas/schedule.schema';

export class ScheduleDto extends AbstractDto {
  @AutoMap(() => UserMinDto)
  doctor: string;

  @AutoMap()
  begin: string;

  @AutoMap()
  end: string;

  @AutoMap(() => [WeeklyPlan])
  plan: string;
}
