import {
  CreateUserRequestDto,
  GetOneUserRequestDto,
  ValidateLoginRequest,
  UpdateUserRequestDto,
  DeleteOneUserRequestDto,
} from '../dtos/requests';
// import { GetListUserRequestDto } from '../dtos/requests/get-list-user.dto';
import { UserDto } from '../dtos/user.dto';
// import { PaginationResponseDto } from 'src/common/dtos/response.dto';

export interface IUserService {
  createUser: (request: CreateUserRequestDto) => Promise<UserDto>;
  getUser: (request: GetOneUserRequestDto) => Promise<UserDto>;
  updateUser: (request: UpdateUserRequestDto) => Promise<UserDto>;
  deactiveUser: (request: DeleteOneUserRequestDto) => void;
  //   getList: (
  //     request: GetListUserRequestDto,
  //   ) => Promise<PaginationResponseDto<UserDto>>;
  validateLogin: (request: ValidateLoginRequest) => Promise<UserDto>;
}
