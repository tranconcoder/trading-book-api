import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseSuccessResponse } from "../response/base/base-success.response";
import { OkResponse } from "../response/success/ok.response";

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  BaseSuccessResponse<T> | T
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<BaseSuccessResponse<T> | T> {
    return next.handle().pipe(
      map((data) => {
        // If it's already an instance of BaseSuccessResponse, return it as is
        if (data instanceof BaseSuccessResponse) {
          return data;
        }

        // Otherwise, wrap it in OkResponse
        return new OkResponse(data);
      }),
    );
  }
}
