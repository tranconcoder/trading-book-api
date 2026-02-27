import { ErrorCode, SuccessCode } from "./response.enum";

/**
 * Unified response interface for all API responses (success or error).
 * Every service/API call should return this type.
 */
export interface IResponse<T = unknown> {
  /** true = success, false = error */
  success: boolean;

  /** API-specific response code (SuccessCode | ErrorCode) */
  code?: SuccessCode | ErrorCode;

  /** Human-readable message describing the result */
  message: string;

  /** Response payload (only present when success = true) */
  data?: T;

  /** Original HTTP status code (if applicable) */
  statusCode?: number;

  /** ISO 8601 timestamp */
  timestamp: string;
}
