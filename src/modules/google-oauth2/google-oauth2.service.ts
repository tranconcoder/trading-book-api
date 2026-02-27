import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleOauth2Service {
  handleCallback(user: unknown) {
    return {
      message: "Đăng nhập Google thành công",
      user,
    };
  }
}
