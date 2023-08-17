import { CreateAppointmentRequestDto } from './create-appoinment.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAppointmentRequestDto extends PartialType(
  CreateAppointmentRequestDto,
) {
  id: string;
}
