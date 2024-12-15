import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Medical App API')
    .setDescription('API documentation for Medical App')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

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
