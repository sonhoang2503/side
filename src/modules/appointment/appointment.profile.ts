import { createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { UserDocument, UserDto } from '@user.module';
import { AppointmentDocument } from './schemas/appointment.schema';
import { AppointmentDto } from './dtos/appointment.dto';
import { AppointmentDetailDto } from './dtos/appointment-detail.dto';
@Injectable()
export class AppointmentProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      // createMap(
      //   mapper,
      //   UserDocument,
      //   UserDto,
      //   forMember(
      //     (dist) => dist.id,
      //     mapFrom((source) => source._id?.toString()),
      //   ),
      // );

      createMap(
        mapper,
        AppointmentDocument,
        AppointmentDto,
        forMember(
          (dist) => dist.id,
          mapFrom((source) => source._id?.toString()),
        ),
      );

      // createMap(
      //   mapper,
      //   AppointmentDocument,
      //   AppointmentDetailDto,
      //   forMember(
      //     (dist) => dist.id,
      //     mapFrom((source) => source._id?.toString()),
      //   ),
      // );
    };
  }
}
