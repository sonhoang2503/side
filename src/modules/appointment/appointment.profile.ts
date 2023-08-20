import { createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { AppointmentDocument } from './schemas/appointment.schema';
import { AppointmentDto } from './dtos/appointment.dto';
@Injectable()
export class AppointmentProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        AppointmentDocument,
        AppointmentDto,
        forMember(
          (dist) => dist.id,
          mapFrom((source) => source._id?.toString()),
        ),
      );
    };
  }
}
