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
import { AppointmentService } from '../services/appointment.service';
import {
  CreateAppointmentRequestDto,
  GetListAppointmentRequestDto,
  UpdateAppointmentRequestDto,
} from '../dtos/requests';
import { Services } from '@enums';
// import { ResponseInterceptor } from 'src/interceptors';
// import { Permission } from '@decorators';

@Controller('appointments')
// @UseInterceptors(ResponseInterceptor)
export class AppointmentController {
  constructor(
    @Inject(Services.APPOINTMENT)
    private readonly _appointmentService: AppointmentService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getListAppointments(@Query() query: GetListAppointmentRequestDto) {
    return await this._appointmentService.getListAppointments(query);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createAppointment(@Body() request: CreateAppointmentRequestDto) {
    const doc = await this._appointmentService.createAppointment(request);
    return doc;
  }

  // @Permission(AppointmentRole.)
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findAppointment(@Param('id') id: string, @Query() query) {
    console.log(query);
    const doc = await this._appointmentService.getAppointment({ id });
    return doc;
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  async updateAppointment(
    @Param('id') id: string,
    @Body() request: UpdateAppointmentRequestDto,
  ) {
    const doc = await this._appointmentService.updateAppointment({
      id,
      ...request,
    });
    return doc;
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async deleteAppointment(@Param('id') id: string) {
    const doc = await this._appointmentService.deleteAppointment({ id });
    return doc;
  }
}
