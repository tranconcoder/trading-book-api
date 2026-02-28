import {
  Controller,
  Get,
  Req,
  UseGuards,
  UseFilters,
  Res,
} from "@nestjs/common";
import { GoogleOauth2Service, GoogleUser } from "./google-oauth2.service";
import { GoogleOauth2Guard } from "./google-oauth2.guard";
import { GoogleOauth2Filter } from "./google-oauth2.filter";
import type { Request, Response } from "express";

@Controller("auth")
export class GoogleOauth2Controller {
  constructor(private readonly googleOauth2Service: GoogleOauth2Service) {}

  @Get("google")
  @UseGuards(GoogleOauth2Guard)
  googleLogin() {}

  @Get("google/callback")
  @UseGuards(GoogleOauth2Guard)
  @UseFilters(GoogleOauth2Filter)
  googleCallback(@Req() req: Request, @Res() res: Response) {
    console.log({
      data: req.user,
    });
    return this.googleOauth2Service.handleCallback(
      res,
      req.user as any as GoogleUser,
    );
  }
}
