import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { Review } from './review/review.model';
import { ReviewModule } from './review/review.module';
import { EventGateway } from './gateway/event.gateway';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.DB_HOST,
      ssl: true,
      port: config.DB_PORT,
      username: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
      entities: [Review],
      synchronize: true,
    }),
    AuthModule.forRoot({
      // These are the connection details of the app you created on supertokens.com
      connectionURI: config.SUPERTOKENS_CONNECTION_URI,
      apiKey: config.SUPERTOKENS_API_KEY,
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/emailpassword/appinfo
        appName: 'Nest-lab',
        apiDomain: config.APP_DOMAIN,
        websiteDomain: config.APP_DOMAIN,
        apiBasePath: '/api',
        websiteBasePath: '/auth',
      },
    }),
    ReviewModule,
    EventGateway,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
