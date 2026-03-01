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
import { JwtTokenPayload } from "./jwt";
import {
  GenerateAccessTokenDto,
  GenerateAccessTokenDtoResponse,
  GenerateRefreshTokenDto,
  GenerateRefreshTokenDtoResponse,
  VerifyTokenDto,
  VerifyTokenDtoResponse,
  DecodeTokenDto,
  DecodeTokenDtoResponse,
  GenerateTokenPairDto,
  GenerateTokenPairDtoResponse,
} from "./dtos";

/**
 * Service for managing JSON Web Tokens (JWT).
 * Provides methods for generating token pairs, verifying tokens, and decoding tokens.
 */
@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: NestJwtService,
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
  ) {}

  /**
   * Generates an access token using an RSA private key.
   * @param dto - The data for generating token.
   * @returns A promise resolving to the signed access token string.
   * @throws {InternalServerError} If signing fails.
   */
  async generateAccessToken(
    dto: GenerateAccessTokenDto,
  ): Promise<GenerateAccessTokenDtoResponse> {
    const { payload, privateKey } = dto;
    try {
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: privateKey,
        algorithm: this.config.accessAlgorithm as Algorithm,
        expiresIn: this.config.accessExpires,
      });
      return new GenerateAccessTokenDtoResponse({ accessToken });
    } catch (error) {
      throw new InternalServerError(
        `Failed to sign access token: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Generates a refresh token using an RSA private key.
   * @param dto - The data for generating token.
   * @returns A promise resolving to the signed refresh token string.
   * @throws {InternalServerError} If signing fails.
   */
  async generateRefreshToken(
    dto: GenerateRefreshTokenDto,
  ): Promise<GenerateRefreshTokenDtoResponse> {
    const { payload, privateKey } = dto;
    try {
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: privateKey,
        algorithm: this.config.refreshAlgorithm as Algorithm,
        expiresIn: this.config.refreshExpires,
      });
      return new GenerateRefreshTokenDtoResponse({ refreshToken });
    } catch (error) {
      throw new InternalServerError(
        `Failed to sign refresh token: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  /**
   * Generates a token pair (access + refresh token) simultaneously.
   * @param dto - The data for generating tokens.
   * @returns An object containing accessToken and refreshToken.
   * @throws {InternalServerError} If token generation fails.
   */
  async generateTokenPair(
    dto: GenerateTokenPairDto,
  ): Promise<GenerateTokenPairDtoResponse> {
    const { payload, privateKey } = dto;
    try {
      const [accessRes, refreshRes] = await Promise.all([
        this.generateAccessToken({ payload, privateKey }),
        this.generateRefreshToken({ payload, privateKey }),
      ]);

      return new GenerateTokenPairDtoResponse({
        accessToken: accessRes.accessToken,
        refreshToken: refreshRes.refreshToken,
      });
    } catch (error) {
      if (error instanceof InternalServerError) throw error;
      throw new InternalServerError("Error generating token pair");
    }
  }

  /**
   * Verifies a JWT token using an RSA public key.
   * @param dto - The verification data.
   * @returns A promise resolving to the decoded and verified payload.
   * @throws {UnauthorizedError} If verification fails or the token is expired.
   */
  async verifyToken(dto: VerifyTokenDto): Promise<VerifyTokenDtoResponse> {
    const { token, publicKey } = dto;
    try {
      const payload = await this.jwtService.verifyAsync<JwtTokenPayload>(
        token,
        {
          publicKey,
          algorithms: [
            this.config.accessAlgorithm as Algorithm,
            this.config.refreshAlgorithm as Algorithm,
          ],
        },
      );
      return new VerifyTokenDtoResponse(payload);
    } catch (error) {
      throw new UnauthorizedError(
        error instanceof Error ? error.message : "Invalid or expired token",
      );
    }
  }

  /**
   * Decodes a JWT token without verification.
   * Note: This does not verify the signature nor the expiration.
   * @param dto - The data to decode.
   * @returns The decoded payload.
   * @throws {BadRequestError} If the token is malformed.
   */
  decodeToken(dto: DecodeTokenDto): DecodeTokenDtoResponse {
    const { token } = dto;
    try {
      const decoded = this.jwtService.decode<JwtTokenPayload>(token);
      if (!decoded) {
        throw new BadRequestError("Malformed JWT token");
      }
      return new DecodeTokenDtoResponse(decoded);
    } catch (error) {
      if (error instanceof BadRequestError) throw error;
      throw new BadRequestError("Failed to decode token");
    }
  }
}
