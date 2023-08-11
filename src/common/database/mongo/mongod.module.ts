import { Module } from '@nestjs/common';
import { MongodService } from './mongod.service';

@Module({
  providers: [MongodService],
  exports: [MongodService],
  imports: [],
})
export class MongodModule {}
