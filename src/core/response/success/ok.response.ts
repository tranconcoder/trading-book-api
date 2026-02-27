import { BaseSuccessResponse } from "../base/base-success.response";

/** 200 OK */
export class OkResponse<T = unknown> extends BaseSuccessResponse<T> {
  constructor(data?: T, message = "Success") {
    super(message, data, 200);
  }
}
