import { Module } from '@nestjs/common';
import { AppointmentService } from './services/appointment.service';
import { AppointmentController } from './controllers/appointment.controller';

@Module({
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppoinmentModule {}
