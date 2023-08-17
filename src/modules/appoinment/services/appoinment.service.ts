// import {
//   Injectable,
//   Inject,
//   //   BadRequestException,
//   //   ConflictException,
// } from '@nestjs/common';
// import { Mapper } from '@automapper/core';
// import { InjectMapper } from '@automapper/nestjs';
// import { Logger } from '@nestjs/common';

// // import { AppoinmentDocument } from '../schemas/appoinment.schema';
// // import { AppoinmentDto } from '../dtos/appoinment.dto';
// import { Repository } from '@enums';
// import { AppoinmentRepository } from '../repositories/appoinment.repository';
// // import { IAppoinmentService } from './appoinment.implement';
// @Injectable()
// export class AppoinmentService implements IAppoinmentService {
//   private readonly _loggerService = new Logger(AppoinmentService.name);
//   constructor(
//     @InjectMapper() private readonly _mapper: Mapper,
//     @Inject(Repository.APPOINMENT)
//     private readonly _appoinmentRepository: AppoinmentRepository,
//   ) {}
// }
