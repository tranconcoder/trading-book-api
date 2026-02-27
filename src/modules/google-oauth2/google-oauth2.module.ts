import { Module } from "@nestjs/common";
import { GoogleOauth2Service } from "./google-oauth2.service";
import { GoogleOauth2Controller } from "./google-oauth2.controller";
import { ConfigModule } from "@nestjs/config";
import googleOauth2Config from "./google-oauth2.config";
import { GoogleStrategy } from "./google-oauth2.strategy";

@Module({
  imports: [ConfigModule.forFeature(googleOauth2Config)],
  controllers: [GoogleOauth2Controller],
  providers: [GoogleOauth2Service, GoogleStrategy],
})
export class GoogleOauth2Module {}
