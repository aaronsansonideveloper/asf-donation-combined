/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ip, ipv6 } from 'address';
import helmet from "helmet";
import { Logger } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

import { ValidationPipe } from "@nestjs/common";
import {
  ExpressAdapter,
  type NestExpressApplication,
} from "@nestjs/platform-express";

import { NestFactory } from "@nestjs/core";
import { MainAppModule } from "./main-app.module";

import appConfig from "./utils/config/configurations";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import configurations from "./utils/config/configurations";
import { ResponseInterceptor } from "./utils/middlewares/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    MainAppModule,
    new ExpressAdapter(),
    {
      cors: true,
      rawBody: true,
      bodyParser: true,
    },
  );

  app.set("trust proxy", 1);

  app.enableCors({
    origin: ["localhost:9008"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  app.setGlobalPrefix("api");

  if (configurations.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('ASF-Donation Project')
      .setDescription('Used to collect donation for asf project')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document, {
      useGlobalPrefix: true,
      explorer: false,
    });
  }

  app.use(cookieParser());
  app.use(helmet({}));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableCircularCheck: true,
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters();

  app.listen(parseInt(appConfig.PORT));

  onApplicationBootstrap();

  Logger.log(`Main-Application Server running on ${appConfig.PORT}`);
}
bootstrap();
function onApplicationBootstrap() {
  // do something on init
  Logger.log({
    application: "main-app",
    port: appConfig.PORT,
    node_env: appConfig.NODE_ENV,
    swagger_enabled: appConfig.NODE_ENV === 'production' ? false : true,
    host_url: appConfig.HOST + ":" + appConfig.PORT,
  });
}

