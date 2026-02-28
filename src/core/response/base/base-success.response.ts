import { IResponse } from "../response.interface";
import { SuccessCode } from "../response.enum";
import { Response } from "express";

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

  /**
   * Send this success response using the provided Express response object.
   */
  public sendResponse(res: Response) {
    return res.status(this.statusCode || 200).json(this);
  }
}
