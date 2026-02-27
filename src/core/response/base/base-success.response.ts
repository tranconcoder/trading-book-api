import { IResponse } from "../response.interface";
import { SuccessCode } from "../response.enum";

/**
 * Base class for all success responses.
 * Concrete success classes should extend this.
 */
export class BaseSuccessResponse<T = unknown> implements IResponse<T> {
  public readonly success = true as const;
  public readonly code?: SuccessCode;
  public readonly message: string;
  public readonly data?: T;
  public readonly statusCode?: number;
  public readonly timestamp: string;

  constructor(
    message: string,
    data?: T,
    statusCode?: number,
    code?: SuccessCode,
  ) {
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    this.code = code;
    this.timestamp = new Date().toISOString();
  }
}
