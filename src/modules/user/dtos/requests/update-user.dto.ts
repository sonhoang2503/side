import { CreateUserRequestDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {
  id: string;
}
