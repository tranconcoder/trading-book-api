import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { ConfigModule } from "@nestjs/config";
import userConfig from "./user.config";
import { AccessControlModule } from "../access-control/access-control.module";

/**
 * Module responsible for managing user-related functionality.
 * This includes user data synchronization, profile management, and role-based access control.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(userConfig),
    AccessControlModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
