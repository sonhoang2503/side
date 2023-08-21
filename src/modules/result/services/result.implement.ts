import { PaginationResponseDto } from '@dtos';
import {
  CreateResultRequestDto,
  UpdateResultRequestDto,
  GetOneResultRequestDto,
  DeleteOneResultRequestDto,
  GetListResultsRequestDto,
} from '../dtos/requests';
import { ResultDto } from '../dtos/result.dto';

export interface IResultService {
  createResult: (request: CreateResultRequestDto) => Promise<ResultDto>;
  getResult: (request: GetOneResultRequestDto) => Promise<ResultDto>;
  updateResult: (request: UpdateResultRequestDto) => Promise<ResultDto>;
  deleteResult: (request: DeleteOneResultRequestDto) => void;
  getListResults: (
    request: GetListResultsRequestDto,
  ) => Promise<PaginationResponseDto<ResultDto>>;
}
