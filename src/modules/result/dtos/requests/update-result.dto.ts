// import { AppointmentStatus } from '../../enums/res.enum';
import { CreateResultRequestDto } from './create-result.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';

export class UpdateResultRequestDto extends PartialType(
  CreateResultRequestDto,
) {
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  id: string;
}
