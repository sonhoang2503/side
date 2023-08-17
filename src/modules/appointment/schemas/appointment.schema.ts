// import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from '@mongod';
import { AutoMap } from '@automapper/classes';
import { UserDepartment } from '@user.module';
import { AppoinmentTimeFrame } from '../enums/appointment.enum';

@Schema({ collection: 'appoinments' })
export class AppointmentDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'users' })
  @AutoMap()
  user: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'users' })
  @AutoMap()
  doctor: string;

  @Prop({ type: SchemaTypes.String, required: true })
  @AutoMap()
  description: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    enum: UserDepartment,
  })
  @AutoMap(() => String)
  department: UserDepartment;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    enum: AppoinmentTimeFrame,
  })
  time_frame: AppoinmentTimeFrame;

  @Prop({
    type: SchemaTypes.Date,
    required: true,
  })
  appointment_day: string;
}

const AppointmentSchema = SchemaFactory.createForClass(AppointmentDocument);

export { AppointmentSchema };
