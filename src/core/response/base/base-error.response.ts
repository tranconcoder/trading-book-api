import { IResponse } from "../response.interface";
import { ErrorCode } from "../response.enum";

/**
 * Base class for all error responses.
 * Concrete error classes should extend this.
 */
export class BaseErrorResponse extends Error implements IResponse<never> {
  public readonly success = false as const;
  public readonly code?: ErrorCode;
  public readonly message: string;
  public readonly data?: never;
  public readonly statusCode?: number;
  public readonly timestamp: string;

  constructor(message: string, statusCode?: number, code?: ErrorCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
    this.timestamp = new Date().toISOString();

    // Ensure the prototype is correctly set for instanceOf checks
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, this.constructor);
  }
}
