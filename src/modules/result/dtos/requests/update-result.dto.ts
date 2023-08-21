// import { AppointmentStatus } from '../../enums/res.enum';
import { CreateResultRequestDto } from './create-result.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateResultRequestDto extends PartialType(
  CreateResultRequestDto,
) {}
