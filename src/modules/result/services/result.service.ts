import {
  Injectable,
  Inject,
  BadRequestException,
  //   ConflictException,
} from '@nestjs/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Logger } from '@nestjs/common';
import { Repository } from '@enums';

import { ResultDocument } from '../schemas/result.schema';
import { ResultRepository } from '../repositories/result.repository';
import { IResultService } from './result.implement';
import { ResultDto } from '../dtos/result.dto';
import {
  CreateResultRequestDto,
  DeleteOneResultRequestDto,
  GetListResultsRequestDto,
  GetOneResultRequestDto,
  UpdateResultRequestDto,
} from '../dtos/requests';
import { PaginationResponseDto } from '@dtos';
@Injectable()
export class ResultService implements IResultService {
  private readonly _loggerService = new Logger(ResultService.name);
  constructor(
    @InjectMapper() private readonly _mapper: Mapper,
    @Inject(Repository.RESULT)
    private readonly _resultRepository: ResultRepository,
  ) {}

  async createResult(payload: CreateResultRequestDto): Promise<ResultDto> {
    try {
      const doc = await this._resultRepository.create({
        ...payload,
      });
      // return doc;
      return this._mapper.map(doc, ResultDocument, ResultDto);
    } catch (e) {
      console.log(e);
      // this._loggerService.error(e);
      throw new BadRequestException('Error creating new Result');
    }
  }

  async getResult(payload: GetOneResultRequestDto): Promise<ResultDto> {
    try {
      const doc = await this._resultRepository.findOne({ ...payload }, [
        {
          path: 'user',
          model: 'UserDocument',
        },
        {
          path: 'doctor',
          model: 'UserDocument',
        },
      ]);
      // return doc;
      return this._mapper.map(doc, ResultDocument, ResultDto);
    } catch (e) {
      this._loggerService.error(e);
      throw new BadRequestException('Error getting Result');
    }
  }

  async getListResults(
    request: GetListResultsRequestDto,
  ): Promise<PaginationResponseDto<ResultDto>> {
    try {
      const result = await this._resultRepository.findAndCount(request);
      return {
        data: this._mapper.mapArray(result.data, ResultDocument, ResultDto),
        total: result.total,
      };
    } catch (e) {
      this._loggerService.error(e);
      throw new BadRequestException('Error getting Result list!');
    }
  }

  async updateResult(payload: UpdateResultRequestDto): Promise<ResultDto> {
    try {
      const { id, ...update } = payload;
      const doc = await this._resultRepository.findOneAndUpdate(
        { id },
        { ...update },
      );
      return this._mapper.map(doc, ResultDocument, ResultDto);
    } catch (e) {
      throw new BadRequestException('Error updating Result');
    }
  }

  deleteResult(payload: DeleteOneResultRequestDto): Promise<boolean> {
    return this._resultRepository.delete(payload);
  }
}
