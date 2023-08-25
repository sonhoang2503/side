import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { ResultService } from './services/result.service';
import { ResultRepository } from './repositories/result.repository';
import { ResultDocument, ResultSchema } from './schemas/result.schema';
import { ResultController } from './controllers/result.controller';
import { ResultProfile } from './result.profile';
import { Services, Repository } from '@enums';
import { QueueName } from '@constants';
import { GeneratePDF } from './queue/generate-pdf-result.consumer';

const services = [
  {
    provide: Services.RESULT,
    useClass: ResultService,
  },
  {
    provide: Repository.RESULT,
    useClass: ResultRepository,
  },
];
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ResultDocument.name,
        schema: ResultSchema,
      },
    ]),
    BullModule.registerQueue({
      name: QueueName.GenerateResultPDF,
    }),
  ],
  providers: [ResultProfile, ...services, GeneratePDF],
  controllers: [ResultController],
})
export class ResultModule {}
