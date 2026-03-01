import { Controller, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import type { Request, Response } from "express";
import { UserUtil } from "../access-control/user.util";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userUtil: UserUtil,
  ) {}

  public async refreshToken(@Req() req: Request, refreshToken: string) {
    const userId = this.userUtil.getUserIdFromRequest(req);

    return this.authService;
  }
}
