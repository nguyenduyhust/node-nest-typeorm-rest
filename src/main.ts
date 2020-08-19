import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // configuration
  const configService = app.get(ConfigService);
  // validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  // swagger
  const options = new DocumentBuilder()
    .setTitle('Node Nest Typeorm Rest API')
    .setDescription('Node Nest Typeorm Rest API')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  // listen
  await app.listen(configService.get('app.port'));
}
bootstrap();
