import { Module } from "@nestjs/common";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import jwtConfig from "./jwt.config";
import { JwtService } from "./jwt.service";
import { JwtController } from "./jwt.controller";

@Module({
  imports: [ConfigModule.forFeature(jwtConfig), NestJwtModule.register({})],
  controllers: [JwtController],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
