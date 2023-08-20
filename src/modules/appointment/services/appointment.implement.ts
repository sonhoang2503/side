import { PaginationResponseDto } from '@dtos';
import {
  CreateAppointmentRequestDto,
  UpdateAppointmentRequestDto,
  GetOneAppointmentRequestDto,
  DeleteOneAppointmentRequestDto,
  GetListAppointmentRequestDto,
} from '../dtos/requests';
import { AppointmentDto } from '../dtos/appointment.dto';

export interface IAppointmentService {
  createAppointment: (
    request: CreateAppointmentRequestDto,
  ) => Promise<AppointmentDto>;
  getAppointment: (
    request: GetOneAppointmentRequestDto,
  ) => Promise<AppointmentDto>;
  updateAppointment: (
    request: UpdateAppointmentRequestDto,
  ) => Promise<AppointmentDto>;
  deleteAppointment: (request: DeleteOneAppointmentRequestDto) => void;
  getListAppointments: (
    request: GetListAppointmentRequestDto,
  ) => Promise<PaginationResponseDto<AppointmentDto>>;
}
