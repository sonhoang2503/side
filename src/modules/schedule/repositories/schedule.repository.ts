import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from '@mongod';
import { Logger } from '@nestjs/common';
import { ScheduleDocument } from '../schemas/schedule.schema';

@Injectable()
export class ScheduleRepository extends AbstractRepository<ScheduleDocument> {
  protected logger = new Logger(ScheduleRepository.name);
  constructor(
    @InjectModel(ScheduleDocument.name)
    private readonly _scheduleModel: Model<ScheduleDocument>,

    @InjectConnection() connection: Connection,
  ) {
    super(_scheduleModel, connection);
  }
}
