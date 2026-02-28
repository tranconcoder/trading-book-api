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

@Injectable()
export class JwtService {
  constructor(
    private readonly jwtService: NestJwtService,
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Generate Access Token using RSA Private Key
   */
  async generateAccessToken(
    payload: Record<string, unknown>,
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
   * Generate Refresh Token using RSA Private Key
   */
  async generateRefreshToken(
    payload: Record<string, unknown>,
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
   * Generate Token Pair (Access + Refresh)
   */
  async generateTokenPair(
    payload: Record<string, unknown>,
    privateKey: string,
  ) {
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
   * Verify Token using RSA Public Key
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
   * Decode Token without verification (no key required)
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
