import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResultService } from './services/result.service';
import { ResultRepository } from './repositories/result.repository';
import { ResultDocument, ResultSchema } from './schemas/result.schema';
import { ResultController } from './controllers/result.controller';
import { ResultProfile } from './result.profile';
import { Services, Repository } from '@enums';

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
  ],
  providers: [ResultProfile, ...services],
  controllers: [ResultController],
})
export class ResultModule {}
