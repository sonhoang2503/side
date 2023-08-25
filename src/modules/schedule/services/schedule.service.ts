import {
  Injectable,
  Inject,
  BadRequestException,
  //   ConflictException,
} from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Logger } from '@nestjs/common';
import { Repository } from '@enums';
import { QueueName } from '@constants';

import { ScheduleDocument } from '../schemas/schedule.schema';
import { ScheduleRepository } from '../repositories/schedule.repository';
// import { IScheduleService } from './schedule.implement';
import { ScheduleDto } from '../dtos/schedule.dto';
import {
  CreateScheduleRequestDto,
  //   DeleteOneScheduleRequestDto,
  //   GetListSchedulesRequestDto,
  //   GetOneScheduleRequestDto,
  //   UpdateScheduleRequestDto,
} from '../dtos/requests';
import { PaginationResponseDto } from '@dtos';
@Injectable()
export class ScheduleService {
  private readonly _loggerService = new Logger(ScheduleService.name);
  constructor(
    @InjectMapper() private readonly _mapper: Mapper,

    @Inject(Repository.SCHEDULE)
    private readonly _scheduleRepository: ScheduleRepository,
  ) {}

  async createSchedule(
    payload: CreateScheduleRequestDto,
  ): Promise<ScheduleDto> {
    try {
      const doc = await this._scheduleRepository.create({
        ...payload,
      });
      // return doc;
      return this._mapper.map(doc, ScheduleDocument, ScheduleDto);
    } catch (e) {
      console.log(e);
      // this._loggerService.error(e);
      throw new BadRequestException('Error creating new Schedule');
    }
  }

  //   async getSchedule(payload: GetOneScheduleRequestDto): Promise<ScheduleDto> {
  //     try {
  //       const doc = await this._scheduleRepository.findOne({ ...payload }, [
  //         {
  //           path: 'user',
  //           model: 'UserDocument',
  //         },
  //         {
  //           path: 'doctor',
  //           model: 'UserDocument',
  //         },
  //       ]);
  //       // return doc;
  //       return this._mapper.map(doc, ScheduleDocument, ScheduleDto);
  //     } catch (e) {
  //       this._loggerService.error(e);
  //       throw new BadRequestException('Error getting Schedule');
  //     }
  //   }

  //   async getListSchedules(
  //     request: GetListSchedulesRequestDto,
  //   ): Promise<PaginationResponseDto<ScheduleDto>> {
  //     try {
  //       const schedule = await this._scheduleRepository.findAndCount(request);
  //       return {
  //         data: this._mapper.mapArray(
  //           schedule.data,
  //           ScheduleDocument,
  //           ScheduleDto,
  //         ),
  //         total: schedule.total,
  //       };
  //     } catch (e) {
  //       this._loggerService.error(e);
  //       throw new BadRequestException('Error getting Schedule list!');
  //     }
  //   }

  //   async updateSchedule(
  //     payload: UpdateScheduleRequestDto,
  //   ): Promise<ScheduleDto> {
  //     try {
  //       const { id, ...update } = payload;
  //       const doc = await this._scheduleRepository.findOneAndUpdate(
  //         { id },
  //         { ...update },
  //       );
  //       return this._mapper.map(doc, ScheduleDocument, ScheduleDto);
  //     } catch (e) {
  //       throw new BadRequestException('Error updating Schedule');
  //     }
  //   }

  //   deleteSchedule(payload: DeleteOneScheduleRequestDto): Promise<boolean> {
  //     return this._scheduleRepository.delete(payload);
  //   }

  //   async testQueue(data) {
  //     return await this._generateSchedulePdfQueue.add(data);
  //   }
}
