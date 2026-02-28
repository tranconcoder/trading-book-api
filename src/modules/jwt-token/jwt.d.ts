import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";

/**
 * Interface representing the payload structure of a JWT token.
 * Extends the base jsonwebtoken JwtPayload to include application-specific fields.
 */
export interface JwtTokenPayload extends BaseJwtPayload {
  /**
   * The unique identifier of the user (UUID).
   */
  userId: string;

  /**
   * The user's email address.
   */
  email: string;
}
