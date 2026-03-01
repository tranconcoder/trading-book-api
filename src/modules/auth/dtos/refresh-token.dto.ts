export class RefreshTokenDto {
  userId: string;
  refreshToken: string;

  constructor(partial: Partial<RefreshTokenDto>) {
    Object.assign(this, partial);
  }
}

export class RefreshTokenDtoResponse {
  accessToken: string;
  refreshToken: string;

  constructor(partial: Partial<RefreshTokenDtoResponse>) {
    Object.assign(this, partial);
  }
}
