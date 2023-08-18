import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentService } from './services/appointment.service';
import { AppointmentRepository } from './repositories/appointment.repository';
import {
  AppointmentDocument,
  AppointmentSchema,
} from './schemas/appointment.schema';
import { AppointmentController } from './controllers/appointment.controller';
import { AppointmentProfile } from './appointment.profile';
import { Services, Repository } from '@enums';

const services = [
  {
    provide: Services.APPOINTMENT,
    useClass: AppointmentService,
  },
  {
    provide: Repository.APPOINTMENT,
    useClass: AppointmentRepository,
  },
];
@Module({
  imports: [
    // MongooseModule.forFeature([
    //   {
    //     name: AppointmentDocument.name,
    //     schema: AppointmentSchema,
    //   },
    // ]),
    MongooseModule.forFeatureAsync([
      {
        name: AppointmentDocument.name,
        useFactory: () => {
          const schema = AppointmentSchema;
          schema.pre('save', async function () {
            await this.populate([
              {
                path: 'user',
                model: 'UserDocument',
              },
              {
                path: 'doctor',
                model: 'UserDocument',
              },
            ]);
          });

          return schema;
        },
      },
    ]),
  ],
  providers: [AppointmentProfile, ...services],
  controllers: [AppointmentController],
})
export class AppointmentModule {}

// name: AppointmentDocument.name,
// useFactory: () => {
//   const schema = AppointmentSchema;
//   schema.pre('save', function () {
//     this.populate([
//       {
//         path: 'user',
//         model: 'users',
//       },
//       {
//         path: 'doctor',
//         model: 'users',
//       },
//     ]);
//   });
//   return schema;
// },
// },
