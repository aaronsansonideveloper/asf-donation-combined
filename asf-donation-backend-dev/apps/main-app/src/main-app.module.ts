import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { LoggerMiddleware } from "./utils/middlewares/logger.middleware";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@app/lib/databases/databases.module";
import appConfig from "./utils/config/configurations";
import { InternalModule } from "./modules/internal.module";

// import { randomUUID } from 'crypto';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    HttpModule,
    DatabaseModule.forRoot({
      type: "mysql",
      host: appConfig.DATABASE_MAIN_HOST,
      port: parseInt(appConfig.DATABASE_MAIN_PORT),
      username: appConfig.DATABASE_MAIN_USERNAME,
      password: appConfig.DATABASE_MAIN_PASSWORD,
      database: appConfig.DATABASE_MAIN_DATABASE,
      synchronize: appConfig.NODE_ENV === "development" ? true : false,
      logger: "debug",
      logging: appConfig.NODE_ENV === "development" ? true : false
    }),
    InternalModule
  ],
  providers: []
})
export class MainAppModule {
  constructor() {
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
