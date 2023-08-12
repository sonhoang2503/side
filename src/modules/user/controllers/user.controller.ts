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
import { UserService } from '../services/user.service';
import { CreateUserRequestDto, UpdateUserRequestDto } from '../dtos/requests';
import { Services } from '@enums';

@Controller('users')
export class UserController {
  constructor(
    @Inject(Services.USER) private readonly _userService: UserService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() payload: CreateUserRequestDto) {
    const doc = await this._userService.createUser(payload);
    return doc;
  }

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
    @Body() payload: UpdateUserRequestDto,
  ) {
    const doc = await this._userService.updateUser({ id, ...payload });
    return doc;
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const doc = await this._userService.deactiveUser({ id });
    return doc;
  }
}
