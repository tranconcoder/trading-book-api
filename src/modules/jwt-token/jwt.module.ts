import { Module } from "@nestjs/common";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import jwtConfig from "./jwt.config";
import { JwtTokenService } from "./jwt.service";
import { JwtTokenController } from "./jwt.controller";

/**
 * Module responsible for JWT token generation, verification, and decoding.
 * Wraps @nestjs/jwt and provides custom configuration management.
 */
@Module({
  imports: [ConfigModule.forFeature(jwtConfig), NestJwtModule.register({})],
  controllers: [JwtTokenController],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
