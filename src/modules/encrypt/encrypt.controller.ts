import { Controller } from "@nestjs/common";
import { EncryptService } from "./encrypt.service";

/**
 * Controller for encryption-related endpoints.
 * Currently serves as a placeholder for future cryptographic operations.
 */
@Controller("encrypt")
export class EncryptController {
  constructor(private readonly encryptService: EncryptService) {}
}
