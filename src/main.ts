import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'express-handlebars';
import { join } from 'path';
import { AppModule } from './app.module';
import { TimingInterceptor } from './interceptors/time.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine(
    'hbs',
    hbs.engine({
      layoutsDir: 'views/layout',
      defaultLayout: 'main',
      extname: 'hbs',
    }),
  );
  app.setViewEngine('hbs');

  app.useGlobalInterceptors(new TimingInterceptor());

  await app.listen(3000);
}
bootstrap();
