import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = configService
        .get<string>('CORS_ALLOWED_ORIGINS')
        .split(',');

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS policy`));
      }
    },
    allowedHeaders: configService.get<string>('CORS_ALLOWED_HEADERS'),
    credentials: configService.get<boolean>('CORS_CREDENTIALS'),
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
