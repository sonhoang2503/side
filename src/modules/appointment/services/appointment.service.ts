import {
  Injectable,
  Inject,
  BadRequestException,
  //   ConflictException,
} from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Logger } from '@nestjs/common';

import { AppointmentDocument } from '../schemas/appointment.schema';
import { Repository } from '@enums';
import { AppointmentRepository } from '../repositories/appointment.repository';
import { IAppointmentService } from './appointment.implement';
import { AppointmentDto } from '../dtos/appointment.dto';
import {
  CreateAppointmentRequestDto,
  DeleteOneAppointmentRequestDto,
  GetOneAppointmentRequestDto,
  UpdateAppointmentRequestDto,
} from '../dtos/requests';
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
      return this._mapper.map(doc, AppointmentDocument, AppointmentDto);
    } catch (e) {
      this._loggerService.error(e);
      throw new BadRequestException('Error creating new appointment');
    }
  }

  async getAppointment(
    payload: GetOneAppointmentRequestDto,
  ): Promise<AppointmentDto> {
    try {
      const doc = await this._appointmentRepository.findOne({ ...payload });
      return this._mapper.map(doc, AppointmentDocument, AppointmentDto);
    } catch (e) {
      this._loggerService.error(e);
      throw new BadRequestException('Error getting appointment');
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
