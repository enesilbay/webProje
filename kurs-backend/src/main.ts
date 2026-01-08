import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Kurs Merkezi API')
    .setDescription('Kurs Merkezi Projesi API uç noktaları ve kullanım detayları')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Uygulama port ${port} üzerinde çalışıyor. Swagger: /api`);
}
bootstrap();