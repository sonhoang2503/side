import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { UserModule } from '@user.module';
import { AuthModule } from '@auth.module';
import { AppointmentModule } from '@appointment.module';
import { ResultModule } from '@result.module';

const modules = [
  SharedModule,
  UserModule,
  AuthModule,
  AppointmentModule,
  ResultModule,
];
@Module({
  imports: [
    // Core
    CoreModule.forRoot(),
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
