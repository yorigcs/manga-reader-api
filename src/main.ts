import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());

  const configSwagger = new DocumentBuilder()
    .setTitle('Manga Reader')
    .setDescription('API documentation')
    .setContact(
      'Linkedin',
      'https://linkedin.com/in/yoridev',
      'yorigcsdev@gmail.com',
    )
    .setExternalDoc(
      'Github Repository',
      'https://github.com/yorigcs/manga-reader-api',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3000);
}
void bootstrap();
