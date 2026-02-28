import type { Request } from "express";
import type { JwtPayload } from "../jwt/jwt";
import { User } from "./entities/user.entity";
import { Injectable, UnauthorizedException } from "@nestjs/common";

/**
 * Utility service for user-related operations.
 */
@Injectable()
export class UserUtil {
  /**
   * Extracts the user ID from the request object.
   * @param req - The Express request object.
   * @returns The user ID derived from the JWT payload.
   * @throws {UnauthorizedException} If the user payload or user ID is missing.
   */
  getUserIdFromRequest(req: Request): string {
    const userPayload = req.user as JwtPayload | undefined;
    if (!userPayload || !userPayload.userId) {
      throw new UnauthorizedException("User not found in request");
    }
    return userPayload.userId;
  }

  /**
   * Filters out sensitive information from the user object for public/login responses.
   * @param user - The user entity object.
   * @returns A partial user object without sensitive fields like googleId, createdAt, and updatedAt.
   */
  getUserLoginInfo(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { googleId, createdAt, updatedAt, ...userInfo } = user;
    return userInfo;
  }

  /**
   * Generates a Redis key for caching user profiles.
   * @param prefix - The Redis key prefix.
   * @param userId - The user ID.
   * @returns A formatted Redis key string.
   */
  getUserRedisKey(prefix: string, userId: string) {
    return `${prefix}:user:profile:${userId}`;
  }
}
