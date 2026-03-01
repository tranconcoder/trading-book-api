import { JwtTokenPayload } from "../jwt";

export class GenerateTokenPairDto {
  payload: JwtTokenPayload;
  privateKey: string;
}

export class GenerateTokenPairDtoResponse {
  accessToken: string;
  refreshToken: string;

  constructor(partial: Partial<GenerateTokenPairDtoResponse>) {
    Object.assign(this, partial);
  }
}
