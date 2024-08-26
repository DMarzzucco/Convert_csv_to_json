import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  }

  const config = new DocumentBuilder()
    .setTitle('Cats expample')
    .setDescription('The cats Api Description')
    .setVersion('1.0')
    .addTag("cats")
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = process.env.PORT || 3001;

  app.enableCors(corsOptions);
  app.setGlobalPrefix("api")

  await app.listen(port);
  console.log(`port listen in ${port}`)
}
bootstrap();
