import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilitar CORS
  app.enableCors();

  // ✅ Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('API Facturación e Inventario')
    .setDescription('Documentación de la API para el sistema basado en Raspberry Pi')
    .setVersion('1.0')
    .addBearerAuth() // Si usas JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger en /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
