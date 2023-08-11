import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { RedisModule } from '@liaoliaots/nestjs-redis';
import { MongodModule, MongodService } from '@mongod';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema, config } from '@config';

@Module({})
export class CoreModule {
  static forRoot(): DynamicModule {
    return {
      module: CoreModule,
      controllers: [],
      providers: [],
      exports: [],
      imports: [
        // Config
        ConfigModule.forRoot({
          //   envFilePath: `${process.cwd()}/src/config/.env/.env.${
          //     process.env.NODE_ENV
          //   }`,
          load: config,
          validationSchema,
          isGlobal: true,
        }),

        // Redis
        // RedisModule.forRootAsync({
        //   useFactory: (configService: ConfigService) => ({
        //     config: configService.get<object>('database.redis'),
        //   }),
        //   inject: [ConfigService],
        // }),

        // Mongodb
        MongooseModule.forRootAsync({
          inject: [MongodService],
          imports: [MongodModule],
          useFactory: (databaseService: MongodService) =>
            databaseService.createMongooseOptions(),
        }),
      ],
    };
  }
}
