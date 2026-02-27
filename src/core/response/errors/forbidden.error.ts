import { BaseErrorResponse } from "../base/base-error.response";

/** 403 Forbidden */
export class ForbiddenError extends BaseErrorResponse {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}
