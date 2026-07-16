import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );

  const config = new DocumentBuilder()
    .setTitle('PilotPath API')
    .setDescription(
      `
REST API for PilotPath, a platform designed to support pilots throughout their entire journey, from initial training to professional career development.

## Main Features

- Authentication
- Certifications
- Subjects
- Study Sessions
- Question Bank
- Flashcards
- Mock Exams
- Dashboard & Statistics
- Pilot Career Management
`
    )
    .setVersion('0.1.0')
    .setContact('Diego Barth', 'https://github.com/DiegoBarth', '')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3001', 'Local Development')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        description: 'Enter a valid JWT access token.',
      },
      'JWT-auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'PilotPath API Docs',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha'
    }
  });

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();