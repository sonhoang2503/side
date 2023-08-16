import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model, SaveOptions, Types } from 'mongoose';
import { AbstractRepository } from '@mongod';
import { Logger } from '@nestjs/common';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
  protected logger = new Logger(UserRepository.name);
  constructor(
    @InjectModel(UserDocument.name)
    private readonly _userModel: Model<UserDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(_userModel, connection);
  }

  async createUserBySocial(
    payload: Omit<UserDocument, '_id' | 'password' | 'phoneNumber'>,
    options?: SaveOptions,
  ): Promise<UserDocument> {
    const document = new this._userModel({
      ...payload,
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return (await document.save(options)).toJSON() as unknown as UserDocument;
  }
}
