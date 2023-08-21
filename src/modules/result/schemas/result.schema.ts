// import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from '@mongod';
import { AutoMap } from '@automapper/classes';
// import { UserDepartment } from '@user.module';
// import {
//   AppoinmentTimeFrame,
//   AppointmentStatus,
// } from '../enums/result.enum';
// import { UserDocument } from '@user.module';
import { AppointmentDocument } from '@appointment.module';

@Schema({ collection: 'results' })
export class ResultDocument extends AbstractDocument {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: AppointmentDocument.name,
  })
  appointment: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  @AutoMap(() => String)
  symptom: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  @AutoMap(() => String)
  description: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  @AutoMap(() => String)
  conclusion: string;

  @Prop({
    type: [SchemaTypes.String],
    required: false,
  })
  images: [string];

  //   @Prop({
  //     type: SchemaTypes.ObjectId,
  //     required: true,
  //     ref: UserDocument.name,
  //   })
  //   @AutoMap(() => UserDocument)
  //   user: string;
  //   @Prop({
  //     type: SchemaTypes.ObjectId,
  //     required: true,
  //     ref: UserDocument.name,
  //   })
  //   @AutoMap(() => UserDocument)
  //   doctor: string;
  //   @Prop({ type: SchemaTypes.String, required: true })
  //   @AutoMap()
  //   description: string;
  //   @Prop({
  //     type: SchemaTypes.String,
  //     required: true,
  //     enum: UserDepartment,
  //   })
  //   @AutoMap(() => String)
  //   department: UserDepartment;
  //   @Prop({
  //     type: SchemaTypes.String,
  //     required: true,
  //     enum: AppoinmentTimeFrame,
  //   })
  //   @AutoMap(() => String)
  //   time_frame: AppoinmentTimeFrame;
  //   @Prop({
  //     type: SchemaTypes.String,
  //     required: true,
  //   })
  //   @AutoMap()
  //   appointment_day: string;
  //   @Prop({
  //     type: SchemaTypes.String,
  //     required: true,
  //     enum: AppointmentStatus,
  //     default: AppointmentStatus.PENDING,
  //   })
  //   @AutoMap(() => String)
  //   status?: AppointmentStatus;
  //   @Prop({
  //     type: Boolean,
  //     required: true,
  //     default: false,
  //   })
  //   @AutoMap(() => Boolean)
  //   is_confirm?: boolean;
  // @Prop({
  //   type: SchemaTypes.ObjectId,
  //   required: true,
  //   ref: ResultDocument.name,
  // })
  // result: string;
  // @Prop({
  //   type: SchemaTypes.String,
  //   required: true,
  //   enum: ResultStatus.PENDING,
  // })
  // result_status: string;
}

const AppointmentSchema = SchemaFactory.createForClass(AppointmentDocument);
// AppointmentSchema.pre('save', async function () {
//   await this.populate([
//     {
//       path: 'user',
//       model: UserDocument.name,
//     },
//     {
//       path: 'doctor',
//       model: UserDocument.name,
//     },
//   ]);
// });

export { AppointmentSchema };
