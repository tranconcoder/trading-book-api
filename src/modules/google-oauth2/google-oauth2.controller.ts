import { Controller, Get, Req, UseGuards, UseFilters } from "@nestjs/common";
import { GoogleOauth2Service } from "./google-oauth2.service";
import { GoogleOauth2Guard } from "./google-oauth2.guard";
import { GoogleOauth2Filter } from "./google-oauth2.filter";
import type { Request } from "express";

@Controller("auth")
export class GoogleOauth2Controller {
  constructor(private readonly googleOauth2Service: GoogleOauth2Service) {}

  @Get("google")
  @UseGuards(GoogleOauth2Guard)
  googleLogin() {}

  @Get("google/callback")
  @UseGuards(GoogleOauth2Guard)
  @UseFilters(GoogleOauth2Filter)
  googleCallback(@Req() req: Request) {
    return this.googleOauth2Service.handleCallback(req.user);
  }
}
