import { Injectable } from "@nestjs/common";
import { RefreshTokenDto } from "./dtos";
import { KeyTokenService } from "../key-token/key-token.service";
import { ErrorCode, ErrorMessage, ForbiddenError } from "@/core/response";
import { JwtTokenService } from "../jwt-token/jwt.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly keyTokenService: KeyTokenService,
    private readonly jwtService: JwtTokenService,
  ) {}

  public async handleRefreshToken(data: RefreshTokenDto) {
    // 1. Prepare data
    const { userId, refreshToken } = data;
    const keyToken = await this.keyTokenService.getKeyToken(userId);

    if (!keyToken)
      throw new ForbiddenError(
        ErrorMessage.AUTH_JWT_FORBIDDEN,
        ErrorCode.AUTH_JWT_FORBIDDEN,
      );

    // 2. Handle verify refresh token
    await this.jwtService.verifyToken({
      publicKey: keyToken.publicKey,
      token: refreshToken,
    });
  }
}
