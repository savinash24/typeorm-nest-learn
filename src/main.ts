import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AddressInfo } from 'net';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = await app.listen(3000);

  const address = server.address() as AddressInfo;  
  const host = address.address === '::' ? 'localhost' : address.address;
  const port = address.port;
  
  console.log(`Application is running on: http://${host}:${port}`);
}
bootstrap();
