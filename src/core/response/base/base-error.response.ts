import { IResponse } from "../response.interface";
import { ErrorCode } from "../response.enum";

/**
 * Base class for all error responses.
 * Concrete error classes should extend this.
 */
export class BaseErrorResponse implements IResponse<never> {
  public readonly success = false as const;
  public readonly code?: ErrorCode;
  public readonly message: string;
  public readonly data?: never;
  public readonly statusCode?: number;
  public readonly timestamp: string;

  constructor(message: string, statusCode?: number, code?: ErrorCode) {
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
    this.timestamp = new Date().toISOString();
  }
}
