import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

export function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
) {
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
`,
    )
    .setVersion(configService.getOrThrow<string>('app.version'))
    .setContact('Diego Barth', 'https://github.com/DiegoBarth', '')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer(`http://localhost:${configService.getOrThrow<number>('app.port')}`, 'Local Development')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter a valid JWT access token.',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(
    'docs',
    app,
    document,
    {
      customSiteTitle: 'PilotPath API Docs',
      swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'list',
        tagsSorter: 'alpha',
        operationsSorter: 'alpha'
      }
    }
  );
}