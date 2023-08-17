import { Module } from '@nestjs/common';
import { AppoinmentService } from './appoinment.service';
import { AppoinmentController } from './appoinment.controller';

@Module({
  providers: [AppoinmentService],
  controllers: [AppoinmentController]
})
export class AppoinmentModule {}
