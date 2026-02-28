import { Module } from "@nestjs/common";
import { EncryptService } from "./encrypt.service";
import { EncryptController } from "./encrypt.controller";

/**
 * Module providing encryption and cryptographic utilities.
 */
@Module({
  controllers: [EncryptController],
  providers: [EncryptService],
  exports: [EncryptService],
})
export class EncryptModule {}
