import {
  Injectable,
  Inject,
  //   BadRequestException,
  //   ConflictException,
} from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Logger } from '@nestjs/common';

// import { AppointmentDocument } from '../schemas/appointment.schema';
// import { AppointmentDto } from '../dtos/appointment.dto';
import { Repository } from '@enums';
import { AppointmentRepository } from '../repositories/appointment.repository';
// import { IAppointmentService } from './appointment.implement';
@Injectable()
export class AppointmentService {
  private readonly _loggerService = new Logger(AppointmentService.name);
  constructor(
    @InjectMapper() private readonly _mapper: Mapper,
    @Inject(Repository.APPOINTMENT)
    private readonly _appointmentRepository: AppointmentRepository,
  ) {}
}
