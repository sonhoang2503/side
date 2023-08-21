import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from '@mongod';
import { Logger } from '@nestjs/common';
import { ResultDocument } from '../schemas/result.schema';

@Injectable()
export class ResultRepository extends AbstractRepository<ResultDocument> {
  protected logger = new Logger(ResultRepository.name);
  constructor(
    @InjectModel(ResultDocument.name)
    private readonly _resultModel: Model<ResultDocument>,

    @InjectConnection() connection: Connection,
  ) {
    super(_resultModel, connection);
  }
}
