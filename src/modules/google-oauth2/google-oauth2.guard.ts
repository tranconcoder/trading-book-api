import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Authentication guard for Google OAuth2 using Passport 'google' strategy.
 */
@Injectable()
export class GoogleOauth2Guard extends AuthGuard("google") {}
