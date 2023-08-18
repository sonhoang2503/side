// import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from '@mongod';
import { AutoMap } from '@automapper/classes';
import { UserDepartment } from '@user.module';
import { AppoinmentTimeFrame } from '../enums/appointment.enum';
import { UserDocument } from '@user.module';

@Schema({ collection: 'appointments' })
export class AppointmentDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: UserDocument.name })
  @AutoMap(() => SchemaTypes.ObjectId)
  user: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: UserDocument.name })
  @AutoMap(() => SchemaTypes.ObjectId)
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
  @AutoMap(() => String)
  time_frame: AppoinmentTimeFrame;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  @AutoMap()
  appointment_day: string;
}

const AppointmentSchema = SchemaFactory.createForClass(AppointmentDocument);
AppointmentSchema.pre('save', function () {
  this.populate([
    {
      path: 'user',
      model: 'UserDocument',
    },
    {
      path: 'doctor',
      model: 'UserDocument',
    },
  ]);
  // next();
});

export { AppointmentSchema };
