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
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return await this._authService.login(loginRequestDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() registerRequestDto: RegisterRequestDto) {
    return await this._authService.register(registerRequestDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refresh(@Body() refreshRequestDto: RefresRequestDto) {
    return await this._authService.refresh(refreshRequestDto);
  }
}
