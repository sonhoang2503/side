import { createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { ScheduleDocument } from './schemas/schedule.schema';
import { ScheduleDto } from './dtos/schedule.dto';
@Injectable()
export class ScheduleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        ScheduleDocument,
        ScheduleDto,
        forMember(
          (dist) => dist.id,
          mapFrom((source) => source._id?.toString()),
        ),
      );
    };
  }
}
