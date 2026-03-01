import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserUtil } from "../access-control/user.util";
import type { Request } from "express";
import { AuthGuard } from "../access-control/auth.guard";

/**
 * Controller for handling user-related API endpoints.
 * This includes user data synchronization, profile management, and role-based access control.
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
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: Request) {
    const userId = this.userUtil.getUserIdFromRequest(req);
    const user = await this.userService.getUserProfile(userId);
    if (!user) {
      throw new UnauthorizedException("User not found in database");
    }

    return this.userUtil.getUserLoginInfo(user);
  }
}
