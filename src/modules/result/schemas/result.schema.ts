// import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from '@mongod';
import { AutoMap } from '@automapper/classes';
import { UserDocument } from '@user.module';
import { AppointmentDocument } from '@appointment.module';
import {
  //   AppoinmentTimeFrame,
  ResultStatus,
} from '../enums/result.enum';

@Schema({ collection: 'results' })
export class ResultDocument extends AbstractDocument {
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: AppointmentDocument.name,
  })
  @AutoMap(() => AppointmentDocument)
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
    default: [],
  })
  @AutoMap(() => [String])
  images?: [string];

  @Prop({
    type: SchemaTypes.String,
    required: true,
    enum: ResultStatus,
    default: ResultStatus.PENDING,
  })
  @AutoMap(() => String)
  status: ResultStatus;
}

const ResultSchema = SchemaFactory.createForClass(ResultDocument);
ResultSchema.pre('save', async function () {
  await this.populate([
    {
      path: 'appointment',
      model: AppointmentDocument.name,
      populate: [
        {
          path: 'user',
          model: UserDocument.name,
        },
        {
          path: 'doctor',
          model: UserDocument.name,
        },
      ],
    },
  ]);
});

export { ResultSchema };
