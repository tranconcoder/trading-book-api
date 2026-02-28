import { Inject, Injectable } from "@nestjs/common";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import jwtConfig from "./jwt.config";
import type { ConfigType } from "@nestjs/config";
import type { Algorithm } from "jsonwebtoken";
import {
  InternalServerError,
  UnauthorizedError,
  BadRequestError,
} from "@/core/response/errors";
import { JwtPayload } from "./jwt";

/**
 * Service for managing JSON Web Tokens (JWT).
 * Provides methods for generating token pairs, verifying tokens, and decoding tokens.
 */
@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Generates an access token using an RSA private key.
   * @param payload - The data to include in the token.
   * @param privateKey - The RSA private key for signing.
   * @returns A promise resolving to the signed access token string.
   * @throws {InternalServerError} If signing fails.
   */
  async generateAccessToken(
    payload: JwtPayload,
    privateKey: string,
  ): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload, {
        secret: privateKey,
        algorithm: this.config.accessAlgorithm as Algorithm,
        expiresIn: this.config.accessExpires,
      });
    } catch (error) {
      throw new InternalServerError(
        `Failed to sign access token: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Generates a refresh token using an RSA private key.
   * @param payload - The data to include in the token.
   * @param privateKey - The RSA private key for signing.
   * @returns A promise resolving to the signed refresh token string.
   * @throws {InternalServerError} If signing fails.
   */
  async generateRefreshToken(
    payload: JwtPayload,
    privateKey: string,
  ): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload, {
        secret: privateKey,
        algorithm: this.config.refreshAlgorithm as Algorithm,
        expiresIn: this.config.refreshExpires,
      });
    } catch (error) {
      throw new InternalServerError(
        `Failed to sign refresh token: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Generates a token pair (access + refresh token) simultaneously.
   * @param payload - The data to include in both tokens.
   * @param privateKey - The RSA private key for signing.
   * @returns An object containing accessToken and refreshToken.
   * @throws {InternalServerError} If token generation fails.
   */
  async generateTokenPair(payload: JwtPayload, privateKey: string) {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.generateAccessToken(payload, privateKey),
        this.generateRefreshToken(payload, privateKey),
      ]);

      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof InternalServerError) throw error;
      throw new InternalServerError("Error generating token pair");
    }
  }

  /**
   * Verifies a JWT token using an RSA public key.
   * @param token - The token string to verify.
   * @param publicKey - The RSA public key for verification.
   * @returns A promise resolving to the decoded and verified payload.
   * @throws {UnauthorizedError} If verification fails or the token is expired.
   */
  async verifyToken<T extends object>(
    token: string,
    publicKey: string,
  ): Promise<T> {
    try {
      return await this.jwtService.verifyAsync<T>(token, {
        publicKey,
        algorithms: [
          this.config.accessAlgorithm as Algorithm,
          this.config.refreshAlgorithm as Algorithm,
        ],
      });
    } catch (error) {
      throw new UnauthorizedError(
        error instanceof Error ? error.message : "Invalid or expired token",
      );
    }
  }

  /**
   * Decodes a JWT token without verification.
   * Note: This does not verify the signature nor the expiration.
   * @param token - The token string to decode.
   * @returns The decoded payload.
   * @throws {BadRequestError} If the token is malformed.
   */
  decodeToken<T>(token: string): T {
    try {
      const decoded = this.jwtService.decode<T>(token);
      if (!decoded) {
        throw new BadRequestError("Malformed JWT token");
      }
      return decoded;
    } catch (error) {
      if (error instanceof BadRequestError) throw error;
      throw new BadRequestError("Failed to decode token");
    }
  }
}
