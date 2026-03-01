import { JwtTokenPayload } from "../jwt";

export class GenerateRefreshTokenDto {
  payload: JwtTokenPayload;
  privateKey: string;
}

export class GenerateRefreshTokenDtoResponse {
  refreshToken: string;

  constructor(partial: Partial<GenerateRefreshTokenDtoResponse>) {
    Object.assign(this, partial);
  }
}
