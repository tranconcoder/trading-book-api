import { BaseSuccessResponse } from "../base/base-success.response";

/** 200 Deleted */
export class DeletedResponse extends BaseSuccessResponse<null> {
  constructor(message = "Deleted successfully") {
    super(message, null, 200);
  }
}
