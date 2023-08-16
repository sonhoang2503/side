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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../dtos/requests';
import { Services } from '@enums';
import { ResponseInterceptor } from 'src/common/interceptor/response.interceptor';
import { Permission } from '@decorators';
import { UserRole } from '../enums/user';

@Controller('users')
@UseInterceptors(ResponseInterceptor)
export class UserController {
  constructor(
    @Inject(Services.USER) private readonly _userService: UserService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() request: CreateUserRequestDto) {
    const doc = await this._userService.createUser(request);
    return doc;
  }

  @Permission(UserRole.DOCTOR)
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const doc = await this._userService.getUser({ id });
    return doc;
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() request: UpdateUserRequestDto,
  ) {
    const doc = await this._userService.updateUser({ id, ...request });
    return doc;
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const doc = await this._userService.deactiveUser({ id });
    return doc;
  }
}
