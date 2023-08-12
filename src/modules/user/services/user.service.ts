import {
  Injectable,
  Inject,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import {
  CreateUserRequestDto,
  GetOneUserRequestDto,
  ValidateLoginRequest,
  UpdateUserRequestDto,
  DeleteOneUserRequestDto,
} from '../dtos/requests';
import { UserDocument } from '../schemas/user.schema';
import { UserDto } from '../dtos/user.dto';
import { Repository } from '@enums';
import { UserRepository } from '../repositories/user.repository';
import { IUserService } from './user.implement';
@Injectable()
export class UserService implements IUserService {
  private readonly _loggerService = new Logger(UserService.name);
  constructor(
    @InjectMapper() private readonly _mapper: Mapper,
    @Inject(Repository.USER) private readonly _repository: UserRepository,
  ) {}

  async createUser(request: CreateUserRequestDto): Promise<UserDto> {
    const user = await this.getUser({ email: request.email });
    if (user) {
      throw new ConflictException('Email is already exist');
    }

    try {
      const doc = await this._repository.create({
        ...request,
        password: await bcrypt.hash(request.password, 10),
        isActive: true,
      });
      return this._mapper.map(doc, UserDocument, UserDto);
    } catch (e) {
      this._loggerService.error(e);
      throw new BadRequestException('Error creating new user');
    }
  }

  async getUser(request: GetOneUserRequestDto): Promise<UserDto> {
    try {
      const doc = await this._repository.findOne({ ...request });
      return this._mapper.map(doc, UserDocument, UserDto);
    } catch (e) {
      this._loggerService.error(e);
      throw new BadRequestException('Error getting user');
    }
  }

  async updateUser(request: UpdateUserRequestDto): Promise<UserDto> {
    try {
      const { id, ...update } = request;
      const doc = await this._repository.findOneAndUpdate(
        { id },
        { ...update },
      );
      return this._mapper.map(doc, UserDocument, UserDto);
    } catch (e) {
      throw new BadRequestException('Error updating use');
    }
  }

  deactiveUser(filter: DeleteOneUserRequestDto): Promise<boolean> {
    return this._repository.deactive({ ...filter });
  }

  async validateLogin(request: ValidateLoginRequest): Promise<UserDto> {
    const user = await this._repository.findOne({ email: request.email });
    if (!user) {
      throw new BadRequestException('Email or password is invalid');
    }

    if (!user.isActive) {
      throw new BadRequestException('User not found or is blocked');
    }

    const isMatch = await bcrypt.compare(request.password, user?.password);
    if (!isMatch) {
      throw new BadRequestException('Email or password is invalid');
    }

    return this._mapper.map(user, UserDocument, UserDto);
  }
}
