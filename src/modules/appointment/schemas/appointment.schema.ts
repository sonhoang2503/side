// import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from '@mongod';
import { AutoMap } from '@automapper/classes';
import { UserDepartment, UserDocument, UserSchema } from '@user.module';
import { AppoinmentTimeFrame } from '../enums/appointment.enum';

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
AppointmentSchema.pre('save', function (next) {
  this.populate('user');
  next;
});

export { AppointmentSchema };
