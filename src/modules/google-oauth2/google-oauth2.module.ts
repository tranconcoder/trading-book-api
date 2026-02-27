import { Module } from "@nestjs/common";
import { GoogleOauth2Service } from "./google-oauth2.service";
import { GoogleOauth2Controller } from "./google-oauth2.controller";

@Module({
  controllers: [GoogleOauth2Controller],
  providers: [GoogleOauth2Service],
})
export class GoogleOauth2Module {}
