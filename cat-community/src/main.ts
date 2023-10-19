import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import * as expressBasicAuth from 'express-basic-auth';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //NestExpressApplication를 제네릭으로 써줘야 useStaticAssets를 사용할 수 있다. => express 기반인것을 명시해 줘야한다.
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
      challenge: true,
    }),
  );

  // http://localhost:8000/media/cats/파일명
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media', // 앞의 경로에 media라는 path로 접근할 수 있게 해준다.
  });

  const config = new DocumentBuilder()
    .setTitle('C.I.C API')
    .setDescription('cat')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: true, // 개발시에만 true (배포시에는 배포한 주소로 변경)
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();
