import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  Patch,
  //   UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import { ResultService } from '../services/result.service';
import {
  CreateResultRequestDto,
  GetListResultsRequestDto,
  UpdateResultRequestDto,
} from '../dtos/requests';
import { Services } from '@enums';
// import { ResponseInterceptor } from 'src/interceptors';
// import { Permission } from '@decorators';

@Controller('results')
// @UseInterceptors(ResponseInterceptor)
export class ResultController {
  constructor(
    @Inject(Services.RESULT)
    private readonly _resultService: ResultService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('/test')
  async testQueue(@Body() payload) {
    await this._resultService.testQueue(payload);
    return 'hey';
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getListResults(@Query() query: GetListResultsRequestDto) {
    return await this._resultService.getListResults(query);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createResult(@Body() request: CreateResultRequestDto) {
    const doc = await this._resultService.createResult(request);
    return doc;
  }

  // @Permission(ResultRole.)
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findResult(@Param('id') id: string, @Query() query) {
    console.log(query);
    const doc = await this._resultService.getResult({ id });
    return doc;
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  async updateResult(
    @Param('id') id: string,
    @Body() request: UpdateResultRequestDto,
  ) {
    const doc = await this._resultService.updateResult({
      id,
      ...request,
    });
    return doc;
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async deleteResult(@Param('id') id: string) {
    const doc = await this._resultService.deleteResult({ id });
    return doc;
  }
}
