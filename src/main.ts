import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as morgan from 'morgan';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms'),
  );

  await app.listen(process.env.APP_PORT);
}
bootstrap();
