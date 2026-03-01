import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtTokenService } from "../jwt-token/jwt.service";
import { KeyTokenService } from "../key-token/key-token.service";
import { UnauthorizedError } from "@/core/response/errors";
import { AUTH_COOKIES } from "./auth.constant";
import { JwtTokenPayload } from "../jwt-token/jwt";
import type { Request } from "express";
import { ErrorCode, ErrorMessage } from "@/core/response";

interface AuthorizedRequest extends Request {
  cookies: Record<string, string | undefined>;
  user?: JwtTokenPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtTokenService,
    private readonly keyTokenService: KeyTokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<AuthorizedRequest>();
      const token = request?.cookies?.[AUTH_COOKIES.ACCESS_TOKEN];

      if (!token) {
        throw new UnauthorizedError("Access token not found in cookies");
      }

      // 1. Decode token to get userId (unverified)
      const decodedPayload = this.jwtService.decodeToken({ token });
      const userId = decodedPayload?.userId;

      if (!userId) {
        throw new UnauthorizedError("Invalid token payload");
      }

      // 2. Get publicKey from Redis via KeyTokenService
      const keyToken = await this.keyTokenService.getKeyToken(userId);
      if (!keyToken || !keyToken.publicKey) {
        throw new UnauthorizedError("Invalid or expired session");
      }

      // 3. Verify token with publicKey
      const verifiedPayload = await this.jwtService.verifyToken({
        token,
        publicKey: keyToken.publicKey,
      });

      // 4. Attach to request
      request.user = verifiedPayload;

      return true;
    } catch {
      throw new UnauthorizedError(
        ErrorMessage.AUTH_JWT_FORBIDDEN,
        ErrorCode.AUTH_JWT_FORBIDDEN,
      );
    }
  }
}
