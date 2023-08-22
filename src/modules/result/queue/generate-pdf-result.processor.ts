import {
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { QueueName, NUMBER_CORE_CPUS } from '@constants';

@Processor(QueueName.GenerateResultPDF)
export class GeneratePDF {
  constructor() {}

  @Process({
    concurrency: NUMBER_CORE_CPUS,
  })
  async transcode(payload: Job<any>) {
    console.log(payload.data);
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.info(
      `Completed job ${job.id} of type ${job.name} with result ${JSON.stringify(
        job.returnvalue,
      )}`,
    );
  }

  @OnQueueFailed()
  onFailed(job: any) {
    console.error(
      `Failed job ${job.id} of type ${job.name} with failed reason: ${job.failedReason}`,
    );
  }

  @OnQueueError()
  onError(job: any) {
    console.error(
      `Errored job ${job.id} of type ${job.name} with failed reason: ${job.failedReason}`,
    );
  }
}
