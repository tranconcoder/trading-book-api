import { Module } from "@nestjs/common";
import { JwtTokenModule } from "../jwt-token/jwt.module";
import { KeyTokenModule } from "../key-token/key-token.module";
import { AuthGuard } from "./auth.guard";
import { UserUtil } from "./user.util";

@Module({
  imports: [JwtTokenModule, KeyTokenModule],
  providers: [AuthGuard, UserUtil],
  exports: [AuthGuard, JwtTokenModule, KeyTokenModule, UserUtil],
})
export class AccessControlModule {}
