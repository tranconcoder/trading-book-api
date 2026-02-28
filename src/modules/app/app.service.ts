import { Injectable } from "@nestjs/common";

/**
 * Basic service for system-wide utility or status checks.
 */
@Injectable()
export class AppService {
  /**
   * Returns a basic greeting.
   * @returns "Hello World!"
   */
  getHello(): string {
    return "Hello World!";
  }
}
