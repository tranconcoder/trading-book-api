import { JwtTokenPayload } from "../jwt";

export class GenerateAccessTokenDto {
  payload: JwtTokenPayload;
  privateKey: string;
}

export class GenerateAccessTokenDtoResponse {
  accessToken: string;

  constructor(partial: Partial<GenerateAccessTokenDtoResponse>) {
    Object.assign(this, partial);
  }
}
