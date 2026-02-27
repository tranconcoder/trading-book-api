import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import appConfig, { getEnvPath } from "./app.config";
import { HealthModule } from "../health/health.module";
import { GoogleOauth2Module } from "../google-oauth2/google-oauth2.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvPath(),
      load: [appConfig],
    }),
    HealthModule,
    GoogleOauth2Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
