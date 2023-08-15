import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { AbstractDocument } from '@mongod';
import { UserRole } from '../enums/user';

@Schema({ collection: 'users' })
export class UserDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.String, required: true, trim: true })
  @AutoMap()
  name: string;

  @Prop({ type: SchemaTypes.String, unique: true, trim: true, lowercase: true })
  @AutoMap()
  email: string;

  @Prop({ type: SchemaTypes.String, required: true, default: null })
  @AutoMap()
  phoneNumber: string;

  @Prop({ type: SchemaTypes.String, required: true, minlength: 8, trim: true })
  password: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
    enum: UserRole,
    default: UserRole.USER,
  })
  @AutoMap(() => String)
  role?: UserRole;

  @Prop({ type: SchemaTypes.Boolean, default: false })
  @AutoMap()
  isVerify?: boolean;

  @Prop({ type: SchemaTypes.Boolean, default: false })
  @AutoMap()
  isActive?: boolean;

  @Prop({ type: SchemaTypes.String, required: false })
  @AutoMap()
  avatar?: string;

  @Prop({ type: SchemaTypes.String, required: false, default: null })
  @AutoMap()
  refresh_token?: string;
}

const UserSchema = SchemaFactory.createForClass(UserDocument);

export { UserSchema };
