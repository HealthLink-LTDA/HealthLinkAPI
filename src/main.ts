import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const allowedOrigins = configService.get<string>('CORS_ALLOWED_ORIGINS');

  app.enableCors({
    origin: (origin, callback) => {
      if (allowedOrigins === '*') {
        callback(null, true);
      } else {
        const allowedOriginsArray = allowedOrigins.split(',');

        if (!origin || allowedOriginsArray.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} not allowed by CORS policy`));
        }
      }
    },
    allowedHeaders: configService.get<string>('CORS_ALLOWED_HEADERS'),
    credentials: configService.get<boolean>('CORS_CREDENTIALS'),
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
