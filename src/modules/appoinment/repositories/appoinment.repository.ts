// import { Injectable } from '@nestjs/common';
// import { InjectModel, InjectConnection } from '@nestjs/mongoose';
// import { Connection, Model } from 'mongoose';
// import { AbstractRepository } from '@mongod';
// import { Logger } from '@nestjs/common';
// import { AppoinmentDocument } from '../schemas/appoinment.schema';

// @Injectable()
// export class AppoinmentRepository extends AbstractRepository<AppoinmentDocument> {
//   protected logger = new Logger(AppoinmentRepository.name);
//   constructor(
//     @InjectModel(AppoinmentDocument.name)
//     private readonly _appoinmentModel: Model<AppoinmentDocument>,
//     @InjectConnection() connection: Connection,
//   ) {
//     super(_appoinmentModel, connection);
//   }
// }
