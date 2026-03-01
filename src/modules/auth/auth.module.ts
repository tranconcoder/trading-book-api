import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AccessControlModule } from "../access-control/access-control.module";

@Module({
  imports: [AccessControlModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AccessControlModule],
})
export class AuthModule {}
