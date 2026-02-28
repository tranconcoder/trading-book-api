import { Controller } from "@nestjs/common";
import { JwtService } from "./jwt.service";

/**
 * Controller for JWT-related operations.
 * Currently serves as a placeholder.
 */
@Controller("jwt")
export class JwtController {
  constructor(private readonly jwtService: JwtService) {}
}
