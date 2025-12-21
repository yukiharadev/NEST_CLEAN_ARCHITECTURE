import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './core/interceptors/TransformInterceptor';
import { LoggingInterceptor } from './core/interceptors/LoggingInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appCfg = configService.get('app') || {};
  
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (appCfg.globalPrefix) {
    app.setGlobalPrefix(appCfg.globalPrefix);
  }

  if (appCfg.versioning?.enable) {
    const versionType = appCfg.versioning.type === 'HEADER' ? VersioningType.HEADER : VersioningType.URI;
    if (versionType === VersioningType.URI) {
      app.enableVersioning({
        type: VersioningType.URI,
        prefix: appCfg.versioning.prefix ?? 'v',
        defaultVersion: appCfg.versioning.defaultVersion ?? '1',
      });
    } else {
      app.enableVersioning({
        type: VersioningType.HEADER,
        header: 'Accept-Version',
        defaultVersion: appCfg.versioning.defaultVersion ?? '1',
      });
    }
  }

  app.enableCors();

   const config = new DocumentBuilder()
    .setTitle('NestJS Base API')
    .setDescription(
      `## API Documentation
      
This API follows DDD (Domain-Driven Design) and CQRS (Command Query Responsibility Segregation) patterns.

      `,
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'NestJS Base API Docs',
  });


  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
