import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Delete,
  //   Query,
  HttpStatus,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  LoginRequestDto,
  RegisterRequestDto,
  RefresRequestDto,
} from '../dtos/requests';
import { Services } from '@enums';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly _authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() payload: LoginRequestDto) {
    return await this._authService.login(payload);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() payload: RegisterRequestDto) {
    return await this._authService.register(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refresh(@Body() payload: RefresRequestDto) {
    return await this._authService.refresh(payload);
  }
}
