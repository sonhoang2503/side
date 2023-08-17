// import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from '@mongod';
import { AutoMap } from '@automapper/classes';

@Schema({ collection: 'appoinments' })
export class AppoinmentDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'users' })
  @AutoMap()
  user: string;
}

const AppoinmentSchema = SchemaFactory.createForClass(AppoinmentDocument);

export { AppoinmentSchema };
