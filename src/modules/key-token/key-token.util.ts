import { Injectable } from "@nestjs/common";

/**
 * Utility service for key-token related operations.
 */
@Injectable()
export class KeyTokenUtil {
  /**
   * Generates a Redis key for storing a user's KeyToken.
   * @param prefix - The Redis key prefix.
   * @param userId - The user ID.
   * @returns A formatted Redis key string.
   */
  public getKeyTokenRedisKey(prefix: string, userId: string): string {
    return `${prefix}:${userId}`;
  }
}
