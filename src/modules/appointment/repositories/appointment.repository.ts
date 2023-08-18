import { Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { AbstractRepository } from '@mongod';
import { Logger } from '@nestjs/common';
import { AppointmentDocument } from '../schemas/appointment.schema';

@Injectable()
export class AppointmentRepository extends AbstractRepository<AppointmentDocument> {
  protected logger = new Logger(AppointmentRepository.name);
  constructor(
    @InjectModel(AppointmentDocument.name)
    private readonly _appointmentModel: Model<AppointmentDocument>,

    @InjectConnection() connection: Connection,
  ) {
    super(_appointmentModel, connection);
  }
}
