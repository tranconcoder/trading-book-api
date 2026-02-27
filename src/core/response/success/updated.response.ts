import { BaseSuccessResponse } from "../base/base-success.response";

/** 200 Updated */
export class UpdatedResponse<T = unknown> extends BaseSuccessResponse<T> {
  constructor(data?: T, message = "Updated successfully") {
    super(message, data, 200);
  }
}
