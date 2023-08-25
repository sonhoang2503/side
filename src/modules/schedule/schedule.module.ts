import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleService } from './services/schedule.service';
import { ScheduleRepository } from './repositories/schedule.repository';
import { ScheduleDocument, ScheduleSchema } from './schemas/schedule.schema';
import { ScheduleController } from './controllers/schedule.controller';
import { ScheduleProfile } from './schedule.profile';
import { Services, Repository } from '@enums';

const services = [
  {
    provide: Services.SCHEDULE,
    useClass: ScheduleService,
  },
  {
    provide: Repository.SCHEDULE,
    useClass: ScheduleRepository,
  },
];
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ScheduleDocument.name,
        schema: ScheduleSchema,
      },
    ]),
  ],
  providers: [ScheduleProfile, ...services],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
