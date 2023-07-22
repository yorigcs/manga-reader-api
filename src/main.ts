import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import config from './configuration/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => error.constraints[Object.keys(error.constraints)[0]]);
        return new BadRequestException(result[0]);
      },
    }),
  );

  const configSwagger = new DocumentBuilder()
    .setTitle('Manga Reader')
    .setDescription('API documentation')
    .setContact('Linkedin', 'https://linkedin.com/in/yoridev', 'yorigcsdev@gmail.com')
    .setExternalDoc('Github Repository', 'https://github.com/yorigcs/manga-reader-api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(config().port);
}
void bootstrap();
