export class DecodeTokenDto {
  token: string;
}

export class DecodeTokenDtoResponse {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
  aud?: string | string[];
  iss?: string;
  sub?: string;

  constructor(partial: Partial<DecodeTokenDtoResponse>) {
    Object.assign(this, partial);
  }
}
