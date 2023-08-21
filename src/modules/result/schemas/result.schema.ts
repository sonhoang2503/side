// import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from '@mongod';
import { AutoMap } from '@automapper/classes';
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
  @AutoMap(() => [String])
  images?: [string];
}

const ResultSchema = SchemaFactory.createForClass(ResultDocument);

export { ResultSchema };
