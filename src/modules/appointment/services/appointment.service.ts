import {
  Injectable,
  Inject,
  BadRequestException,
  //   ConflictException,
} from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Logger } from '@nestjs/common';
import { Repository } from '@enums';

import { AppointmentDocument } from '../schemas/appointment.schema';
import { AppointmentRepository } from '../repositories/appointment.repository';
import { IAppointmentService } from './appointment.implement';
import { AppointmentDto } from '../dtos/appointment.dto';
import {
  CreateAppointmentRequestDto,
  DeleteOneAppointmentRequestDto,
  GetListAppointmentRequestDto,
  GetOneAppointmentRequestDto,
  UpdateAppointmentRequestDto,
} from '../dtos/requests';
import { PaginationResponseDto } from '@dtos';
@Injectable()
export class AppointmentService implements IAppointmentService {
  private readonly _loggerService = new Logger(AppointmentService.name);
  constructor(
    @InjectMapper() private readonly _mapper: Mapper,
    @Inject(Repository.APPOINTMENT)
    private readonly _appointmentRepository: AppointmentRepository,
  ) {}

  async createAppointment(
    payload: CreateAppointmentRequestDto,
  ): Promise<AppointmentDto> {
    try {
      const doc = await this._appointmentRepository.create({
        ...payload,
      });
      // return doc;
      return this._mapper.map(doc, AppointmentDocument, AppointmentDto);
    } catch (e) {
      console.log(e);
      // this._loggerService.error(e);
      throw new BadRequestException('Error creating new appointment');
    }
  }

  async getAppointment(
    payload: GetOneAppointmentRequestDto,
  ): Promise<AppointmentDto> {
    try {
      const doc = await this._appointmentRepository.findOne({ ...payload }, [
        {
          path: 'user',
          model: 'UserDocument',
        },
        {
          path: 'doctor',
          model: 'UserDocument',
        },
      ]);
      // return doc;
      return this._mapper.map(doc, AppointmentDocument, AppointmentDto);
    } catch (e) {
      this._loggerService.error(e);
      throw new BadRequestException('Error getting appointment');
    }
  }

  async getListAppointments(
    request: GetListAppointmentRequestDto,
  ): Promise<PaginationResponseDto<AppointmentDto>> {
    try {
      const result = await this._appointmentRepository.findAndCount(request);
      return {
        data: this._mapper.mapArray(
          result.data,
          AppointmentDocument,
          AppointmentDto,
        ),
        total: result.total,
      };
    } catch (e) {
      this._loggerService.error(e);
      throw new BadRequestException('Error getting appointment list!');
    }
  }

  async updateAppointment(
    payload: UpdateAppointmentRequestDto,
  ): Promise<AppointmentDto> {
    try {
      const { id, ...update } = payload;
      const doc = await this._appointmentRepository.findOneAndUpdate(
        { id },
        { ...update },
      );
      return this._mapper.map(doc, AppointmentDocument, AppointmentDto);
    } catch (e) {
      throw new BadRequestException('Error updating appointment');
    }
  }

  deleteAppointment(payload: DeleteOneAppointmentRequestDto): Promise<boolean> {
    return this._appointmentRepository.delete(payload);
  }
}
