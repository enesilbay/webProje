import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors(); 
  
  await app.listen(3001);
  console.log('Backend http://localhost:3001 adresinde çalışıyor');
}
bootstrap();