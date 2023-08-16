import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongodService implements MongooseOptionsFactory {
  private readonly database: string;
  private readonly user: string;
  private readonly password: string;
  private readonly uri: string;

  constructor(private readonly configService: ConfigService) {
    this.uri = this.configService.get<string>('database.mongodb.uri');
    this.database = this.configService.get<string>('database.mongodb.name');
    this.user = this.configService.get<string>('database.mongodb.username');
    this.password = this.configService.get<string>('database.mongodb.password');
  }

  createMongooseOptions(): MongooseModuleOptions {
    let uri;
    if (this.database) {
      uri = `${this.uri}/${this.database}`;
    }

    const mongooseOptions: MongooseModuleOptions = {
      uri,
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   serverSelectionTimeoutMS: 5000,
      // useMongoClient: true
    };

    // if (this.user && this.password) {
    //   mongooseOptions.auth = {
    //     username: this.user,
    //     password: this.password,
    //   };
    // }

    return mongooseOptions;
  }
}
