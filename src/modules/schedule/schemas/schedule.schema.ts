import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from '@mongod';
import { UserDocument } from '@user.module';
import { AppoinmentTimeFrame, AppointmentDocument } from '@appointment.module';

@Schema()
export class WeeklyPlan {
  @Prop({ type: SchemaTypes.Date, required: true })
  @AutoMap(() => String)
  day: Date;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    enum: AppoinmentTimeFrame,
  })
  @AutoMap(() => String)
  time_frame: AppoinmentTimeFrame;

  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: AppointmentDocument.name,
  })
  @AutoMap(() => AppointmentDocument)
  appointment: string;
}

@Schema({ collection: 'schedules' })
export class ScheduleDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  @AutoMap(() => UserDocument)
  doctor: string;

  @Prop({ type: SchemaTypes.Date, required: true, trim: true })
  @AutoMap(() => String)
  begin: Date;

  @Prop({ type: SchemaTypes.Date, required: true, trim: true })
  @AutoMap(() => String)
  end: Date;

  @Prop([WeeklyPlan])
  plan: [WeeklyPlan];
}

const ScheduleSchema = SchemaFactory.createForClass(ScheduleDocument);
ScheduleSchema.pre('save', async function () {
  await this.populate([
    {
      path: 'doctor',
      model: UserDocument.name,
    },
  ]);
});

export { ScheduleSchema };
