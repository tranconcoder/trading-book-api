import { Injectable } from "@nestjs/common";

@Injectable()
export class KeyTokenUtil {
  public getKeyTokenRedisKey(prefix: string, userId: string): string {
    return `${prefix}:${userId}`;
  }
}
