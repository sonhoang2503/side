import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  // const today = moment();
  // const from_date = moment().startOf('week').add(1, 'days');
  // const to_date = moment().endOf('week').add(1, 'd');
  // console.log({
  //   from_date: from_date.toString(),
  //   today: moment().toString(),
  //   to_date: to_date.toString(),
  // });

  const port = configService.get('server.port');
  await app.listen(port);
}
bootstrap();
