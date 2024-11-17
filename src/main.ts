import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { SeederService } from './api/seedeng/seedeng.service';
 const port = process.env.PORT||5000
 const logger = new Logger('Request Middleware',{timestamp: true})
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const seederService = app.get(SeederService);
    await seederService.seed();
    app.enableCors({
      origin: true,
      credentials: true,
    });
    app.setGlobalPrefix('api/');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.use((req, res, next) =>{
      const orignelSend = res.send
      res.send = function () {
        logger.warn(`Response for ${req.method} ${req.url}`)
        orignelSend.apply(res, arguments)
    
      }
      next()
    } )
  
    const config = new DocumentBuilder()
      .setTitle('crm Itech backend')
      .setVersion('3.0')
      .addServer(`http://localhost:${port}`)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        tagsSorter: 'alpha',
      },
    });
  
    await app.listen(port);
  }
  bootstrap().then(() => console.log('Server started',port));