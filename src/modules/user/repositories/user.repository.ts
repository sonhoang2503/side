import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from '@mongod';
import { Logger } from '@nestjs/common';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  protected logger = new Logger(UserRepository.name);
  constructor(
    @InjectModel(UserDocument.name) userModel: Model<UserDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }
}
