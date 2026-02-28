import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

/**
 * Root controller for basic application-level routes.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Simple hello world endpoint used for testing initial deployment.
   * @returns A friendly greeting string.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
