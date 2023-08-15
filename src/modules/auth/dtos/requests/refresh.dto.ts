import { IsString, IsNotEmpty } from 'class-validator';

export class RefresRequestDto {
  @IsString()
  @IsNotEmpty()
  refresh_token: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
