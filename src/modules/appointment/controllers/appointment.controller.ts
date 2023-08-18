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
  //   UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service';
import {
  CreateAppointmentRequestDto,
  UpdateAppointmentRequestDto,
} from '../dtos/requests';
import { Services } from '@enums';
import { ResponseInterceptor } from 'src/common/interceptor/response.interceptor';
// import { Permission } from '@decorators';

@Controller('appointments')
@UseInterceptors(ResponseInterceptor)
export class AppointmentController {
  constructor(
    @Inject(Services.APPOINTMENT)
    private readonly _appointmentService: AppointmentService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() request: CreateAppointmentRequestDto) {
    const doc = await this._appointmentService.createAppointment(request);
    return doc;
  }

  // @Permission(UserRole.)
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const doc = await this._appointmentService.getAppointment({ id });
    return doc;
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:id')
  async updateUser(
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
  async deleteUser(@Param('id') id: string) {
    const doc = await this._appointmentService.deleteAppointment({ id });
    return doc;
  }
}
