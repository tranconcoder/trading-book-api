import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { KeyTokenService } from "./key-token.service";
import { KeyTokenController } from "./key-token.controller";
import keyTokenConfig from "./key-token.config";
import { EncryptModule } from "../encrypt/encrypt.module";
import { JwtModule } from "../jwt/jwt.module";
import { KeyTokenUtil } from "./key-token.util";

@Module({
  imports: [ConfigModule.forFeature(keyTokenConfig), EncryptModule, JwtModule],
  controllers: [KeyTokenController],
  providers: [KeyTokenService, KeyTokenUtil],
  exports: [KeyTokenService, KeyTokenUtil],
})
export class KeyTokenModule {}
