// import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from '@mongod';
import { AutoMap } from '@automapper/classes';
// import { UserDepartment } from '@user.module';
import {
  //   AppoinmentTimeFrame,
  ResultStatus,
} from '../enums/result.enum';
// import { UserDocument } from '@user.module';
import { AppointmentDocument } from '@appointment.module';

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
  })
  images?: [string];

  @Prop({
    type: SchemaTypes.String,
    required: true,
    enum: ResultStatus,
  })
  @AutoMap(() => String)
  status: ResultStatus;
}

const ResultSchema = SchemaFactory.createForClass(ResultDocument);

export { ResultSchema };
