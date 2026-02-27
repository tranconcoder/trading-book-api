import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import appConfig, { getEnvPath } from "../../configs/app.config";
import { HealthModule } from "../health/health.module";
import { GoogleOauth2Module } from "../google-oauth2/google-oauth2.module";

import { TypeOrmModule } from "@nestjs/typeorm";
import databaseConfig, {
  DATABASE_CONFIG_NAMESPACE,
} from "../../configs/database.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvPath(),
      load: [appConfig, databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres" as const,
        host: configService.get<string>(`${DATABASE_CONFIG_NAMESPACE}.host`),
        port: configService.get<number>(`${DATABASE_CONFIG_NAMESPACE}.port`),
        username: configService.get<string>(
          `${DATABASE_CONFIG_NAMESPACE}.username`,
        ),
        password: configService.get<string>(
          `${DATABASE_CONFIG_NAMESPACE}.password`,
        ),
        database: configService.get<string>(
          `${DATABASE_CONFIG_NAMESPACE}.database`,
        ),
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: true,
        migrations: [__dirname + "/../../migrations/*.ts"],
      }),
    }),
    HealthModule,
    GoogleOauth2Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
