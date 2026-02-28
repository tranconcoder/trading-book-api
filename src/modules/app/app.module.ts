import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import appConfig, { getEnvPath } from "../../configs/app.config";
import { HealthModule } from "../health/health.module";
import { CacheModule } from "@nestjs/cache-manager";
import redisConfig, { RedisConfig } from "../../configs/redis.config";
import { redisStore } from "cache-manager-redis-yet";
import { GoogleOauth2Module } from "../google-oauth2/google-oauth2.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import databaseConfig, { DatabaseConfig } from "../../configs/database.config";
import { EncryptModule } from "../encrypt/encrypt.module";
import { JwtModule } from "../jwt/jwt.module";
import { UserModule } from "../user/user.module";
import { KeyTokenModule } from "../key-token/key-token.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvPath(),
      load: [appConfig, databaseConfig, redisConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (dbConfig: DatabaseConfig) => ({
        type: "postgres" as const,
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: true,
        migrations: [__dirname + "/../../migrations/*.ts"],
      }),
    }),
    CacheModule.registerAsync({
      inject: [redisConfig.KEY],
      isGlobal: true,
      useFactory: async (rConfig: RedisConfig) => {
        return {
          store: await redisStore({
            socket: {
              host: rConfig.host,
              port: rConfig.port,
            },
            password: rConfig.password,
            ttl: rConfig.ttl ? rConfig.ttl * 1000 : undefined,
          }),
        };
      },
    }),
    HealthModule,
    EncryptModule,
    JwtModule,
    UserModule,
    KeyTokenModule,
    GoogleOauth2Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
