import {
  Body,
  Controller,
  Get,
  Inject,
  //   Param,
  Post,
  Req,
  //   Query,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  LoginRequestDto,
  RegisterRequestDto,
  RefresRequestDto,
} from '../dtos/requests';
import { Services } from '@enums';
import { GoogleAuthGuard } from '../../../guards/google.guard';
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly _authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() request: LoginRequestDto) {
    return await this._authService.login(request);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() request: RegisterRequestDto) {
    return await this._authService.register(request);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  async refresh(@Body() request: RefresRequestDto) {
    return await this._authService.refresh(request);
  }

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuthenticate() {}

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthenticateCallback(@Req() req) {
    const { user } = req;
    return this._authService.loginUserWithSocial(user);
  }
}
