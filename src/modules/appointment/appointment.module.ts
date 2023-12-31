import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentService } from './services/appointment.service';
import { AppointmentRepository } from './repositories/appointment.repository';
import {
  AppointmentDocument,
  AppointmentSchema,
} from './schemas/appointment.schema';
import { AppointmentController } from './controllers/appointment.controller';
import { AppointmentProfile } from './appointment.profile';
import { Services, Repository } from '@enums';

const services = [
  {
    provide: Services.APPOINTMENT,
    useClass: AppointmentService,
  },
  {
    provide: Repository.APPOINTMENT,
    useClass: AppointmentRepository,
  },
];
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AppointmentDocument.name,
        schema: AppointmentSchema,
      },
    ]),
  ],
  providers: [AppointmentProfile, ...services],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
