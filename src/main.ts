import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { stringify } from 'yaml';
import * as hbs from 'express-handlebars';
import { join } from 'path';
import { AppModule } from './app.module';
import { TimingInterceptor } from './interceptors/time.interceptor';
import { SupertokensExceptionFilter } from './auth/auth.filter';
import supertokens from 'supertokens-node';
import { writeFile } from 'fs/promises';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const swagger = new DocumentBuilder()
    .setTitle('Really')
    .setDescription('Really API')
    .setVersion('1.0')
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('swagger', app, document);
  const yamlString: string = stringify(document, {});
  await writeFile('./swagger-spec.yaml', yamlString);

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

  app.useGlobalFilters(new SupertokensExceptionFilter());

  app.enableCors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
