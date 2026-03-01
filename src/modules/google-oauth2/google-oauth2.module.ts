import { Module } from "@nestjs/common";
import { GoogleOauth2Service } from "./google-oauth2.service";
import { GoogleOauth2Controller } from "./google-oauth2.controller";
import { ConfigModule } from "@nestjs/config";
import googleOauth2Config from "./google-oauth2.config";
import { GoogleStrategy } from "./google-oauth2.strategy";
import appConfig from "@config/app.config";
import vluteConfig from "@config/vlute.config";
import { AccessControlModule } from "../access-control/access-control.module";
import { UserModule } from "../user/user.module";

/**
 * Module responsible for Google OAuth2 authentication.
 * Integrates Passport with Google strategy and provides services for handling the auth flow.
 */
@Module({
  imports: [
    ConfigModule.forFeature(googleOauth2Config),
    ConfigModule.forFeature(appConfig),
    ConfigModule.forFeature(vluteConfig),
    AccessControlModule,
    UserModule,
  ],
  controllers: [GoogleOauth2Controller],
  providers: [GoogleOauth2Service, GoogleStrategy],
})
export class GoogleOauth2Module {}
