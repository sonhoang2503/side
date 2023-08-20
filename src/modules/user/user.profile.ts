import { createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { UserDocument } from './schemas/user.schema';
import { UserDto, UserMinDto } from './dtos/user.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, UserDocument, UserMinDto);

      createMap(
        mapper,
        UserDocument,
        UserDto,
        forMember(
          (dist) => dist.id,
          mapFrom((source) => source._id?.toString()),
        ),
      );
    };
  }
}
