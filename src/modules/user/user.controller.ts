import { Controller, Get, Req, UnauthorizedException } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserUtil } from "./user.util";
import type { Request } from "express";

/**
 * Controller for handling user-related API endpoints.
 */
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userUtil: UserUtil,
  ) {}

  /**
   * Retrieves the current authenticated user's profile.
   * @param req - The Express request object containing the user payload.
   * @returns The filtered user profile information.
   * @throws {UnauthorizedException} If the user is not found in the request or database.
   */
  @Get("profile")
  async getProfile(@Req() req: Request) {
    const userId = this.userUtil.getUserIdFromRequest(req);
    const user = await this.userService.getUserProfile(userId);
    if (!user) {
      throw new UnauthorizedException("User not found in database");
    }

    return this.userUtil.getUserLoginInfo(user);
  }
}
