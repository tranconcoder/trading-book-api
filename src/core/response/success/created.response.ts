import { BaseSuccessResponse } from "../base/base-success.response";

/** 201 Created */
export class CreatedResponse<T = unknown> extends BaseSuccessResponse<T> {
  constructor(data?: T, message = "Created successfully") {
    super(message, data, 201);
  }
}
