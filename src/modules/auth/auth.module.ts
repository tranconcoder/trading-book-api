import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthGuard } from "./auth.guard";
import { JwtTokenModule } from "../jwt-token/jwt.module";
import { KeyTokenModule } from "../key-token/key-token.module";

@Module({
  imports: [JwtTokenModule, KeyTokenModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, JwtTokenModule, KeyTokenModule],
})
export class AuthModule {}
