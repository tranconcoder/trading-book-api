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

/**
 * Controller handling Google OAuth2 authentication flow.
 */
@Controller("auth")
export class GoogleOauth2Controller {
  constructor(private readonly googleOauth2Service: GoogleOauth2Service) {}

  /**
   * Endpoint to initiate the Google OAuth2 login flow.
   * Uses GoogleOauth2Guard to trigger Passport's Google strategy.
   */
  @Get("google")
  @UseGuards(GoogleOauth2Guard)
  googleLogin() {}

  /**
   * Callback endpoint for Google OAuth2.
   * Receives the user information from Google after authentication.
   * @param req - The request object containing the user data populated by Passport.
   * @param res - The response object used for redirection.
   * @returns Redirects the user to the frontend application.
   */
  @Get("google/callback")
  @UseGuards(GoogleOauth2Guard)
  @UseFilters(GoogleOauth2Filter)
  googleCallback(@Req() req: Request, @Res() res: Response) {
    return this.googleOauth2Service.handleCallback(
      res,
      req.user as any as GoogleUser,
    );
  }
}
