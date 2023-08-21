import { createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { ResultDocument } from './schemas/result.schema';
import { ResultDto } from './dtos/result.dto';
@Injectable()
export class ResultProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        ResultDocument,
        ResultDto,
        forMember(
          (dist) => dist.id,
          mapFrom((source) => source._id?.toString()),
        ),
      );
    };
  }
}
