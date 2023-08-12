import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/user.service';
import { UserProfile } from './user.profile';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { UserDocument, UserSchema } from './schemas/user.schema';
import { Services, Repository } from '@enums';

const services = [
  {
    provide: Services.USER,
    useClass: UserService,
  },
  {
    provide: Repository.USER,
    useClass: UserRepository,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserProfile, ...services],
  exports: [...services],
})
export class UserModule {}
