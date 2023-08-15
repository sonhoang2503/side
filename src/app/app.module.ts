import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@core';
import { UserModule } from '@user.module';
import { AuthModule } from '@auth.module';

const modules = [UserModule, AuthModule];
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
