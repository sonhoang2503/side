import {
  CreateAppointmentRequestDto,
  UpdateAppointmentRequestDto,
  GetOneAppointmentRequestDto,
  DeleteOneAppointmentRequestDto,
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
  //   getList: (
  //     request: GetListAppointmentRequestDto,
  //   ) => Promise<PaginationResponseDto<AppointmentDto>>;
}
