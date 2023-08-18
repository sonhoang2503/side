import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@core';
import { UserModule } from '@user.module';
import { AuthModule } from '@auth.module';
import { AppointmentModule } from '@appointment.module';

const modules = [UserModule, AuthModule, AppointmentModule];
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
