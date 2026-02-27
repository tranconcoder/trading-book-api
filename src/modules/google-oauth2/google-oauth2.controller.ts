import { Controller } from "@nestjs/common";
import { GoogleOauth2Service } from "./google-oauth2.service";

@Controller()
export class GoogleOauth2Controller {
  constructor(private readonly googleOauth2Service: GoogleOauth2Service) {}
}
