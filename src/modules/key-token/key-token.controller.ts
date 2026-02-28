import { Controller } from "@nestjs/common";
import { KeyTokenService } from "./key-token.service";

/**
 * Controller for managing key tokens used in authentication.
 * Placeholder for future endpoints such as key rotation or revocation.
 */
@Controller("key-token")
export class KeyTokenController {
  constructor(private readonly keyTokenService: KeyTokenService) {}
}
