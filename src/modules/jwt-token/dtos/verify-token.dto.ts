export class VerifyTokenDto {
  token: string;
  publicKey: string;
}

export class VerifyTokenDtoResponse {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
  aud?: string | string[];
  iss?: string;
  sub?: string;

  constructor(partial: Partial<VerifyTokenDtoResponse>) {
    Object.assign(this, partial);
  }
}
