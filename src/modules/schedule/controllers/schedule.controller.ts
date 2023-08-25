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
import { ScheduleService } from '../services/schedule.service';
import {
  CreateScheduleRequestDto,
  //   GetListScheduleRequestDto,
  //   UpdateScheduleRequestDto,
} from '../dtos/requests';
import { Services } from '@enums';
// import { ResponseInterceptor } from 'src/interceptors';
// import { Permission } from '@decorators';

@Controller('schedules')
// @UseInterceptors(ResponseInterceptor)
export class ScheduleController {
  constructor(
    @Inject(Services.SCHEDULE)
    private readonly _scheduleService: ScheduleService,
  ) {}

  //   @HttpCode(HttpStatus.OK)
  //   @Get()
  //   async getListSchedules(@Query() query: GetListScheduleRequestDto) {
  //     return await this._scheduleService.getListSchedules(query);
  //   }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createSchedule(@Body() request: CreateScheduleRequestDto) {
    const doc = await this._scheduleService.createSchedule(request);
    return doc;
  }

  //   // @Permission(ScheduleRole.)
  //   @HttpCode(HttpStatus.OK)
  //   @Get('/:id')
  //   async findSchedule(@Param('id') id: string, @Query() query) {
  //     console.log(query);
  //     const doc = await this._scheduleService.getSchedule({ id });
  //     return doc;
  //   }

  //   @HttpCode(HttpStatus.OK)
  //   @Patch('/:id')
  //   async updateSchedule(
  //     @Param('id') id: string,
  //     @Body() request: UpdateScheduleRequestDto,
  //   ) {
  //     const doc = await this._scheduleService.updateSchedule({
  //       id,
  //       ...request,
  //     });
  //     return doc;
  //   }

  //   @HttpCode(HttpStatus.OK)
  //   @Delete('/:id')
  //   async deleteSchedule(@Param('id') id: string) {
  //     const doc = await this._scheduleService.deleteSchedule({ id });
  //     return doc;
  //   }
}
