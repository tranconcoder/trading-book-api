import { Controller } from "@nestjs/common";
import { JwtTokenService } from "./jwt.service";

/**
 * Controller for JWT-related operations.
 * Currently serves as a placeholder.
 */
@Controller("jwt")
export class JwtTokenController {
  constructor(private readonly jwtService: JwtTokenService) {}
}
