import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalFilterException } from './utils/GloablFilterExceptions';
import { CORS,port } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Convert CSV to JSON ')
    .setDescription('ApiREst')
    .setVersion('1.0')
    .addServer("/api")
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)


  app.useGlobalFilters(new GlobalFilterException());
  app.enableCors(CORS);
  app.setGlobalPrefix("api")

  await app.listen(port);
  console.log(`port listen in ${port}`)
}
bootstrap();
