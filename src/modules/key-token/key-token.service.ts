import { Inject, Injectable } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { type Cache } from "cache-manager";
import { EncryptService } from "../encrypt/encrypt.service";
import { JwtTokenService } from "../jwt-token/jwt.service";
import type { JwtTokenPayload } from "../jwt-token/jwt";
import { KeyToken } from "./entities/key-token.entity";
import { InternalServerError } from "@/core/response/errors";
import keyTokenConfig from "./key-token.config";
import type { KeyTokenConfig } from "./key-token.config";
import { KeyTokenUtil } from "./key-token.util";

/**
 * Service for managing secure key tokens.
 * Handles the creation of RSA key pairs for JWT signing/verification and persists public keys.
 */
@Injectable()
export class KeyTokenService {
  constructor(
    private readonly encryptService: EncryptService,
    private readonly jwtService: JwtTokenService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @Inject(keyTokenConfig.KEY)
    private readonly config: KeyTokenConfig,
    private readonly keyTokenUtil: KeyTokenUtil,
  ) {}

  /**
   * Creates a new key token for a user.
   * Generates a unique RSA key pair, signs a JWT pair, and stores the public key in Redis.
   * @param jwtPayload - The payload to be included in the JWT tokens.
   * @returns A promise resolving to an object containing accessToken and refreshToken.
   * @throws {InternalServerError} If key generation, signing, or storage fails.
   */
  public async createKeyToken(jwtPayload: JwtTokenPayload) {
    const { userId } = jwtPayload;

    // 1. Create RSA key pair
    const { privateKey, publicKey } =
      await this.encryptService.generateRSAKeyPair();

    // 2. Generate Jwt token pair using the private key
    const { accessToken, refreshToken } =
      await this.jwtService.generateTokenPair(jwtPayload, privateKey);

    // 3. Prepare KeyToken entity
    const keyToken = new KeyToken({
      userId,
      publicKey,
    });

    try {
      // 4. Store to Redis
      const redisKey = this.keyTokenUtil.getKeyTokenRedisKey(
        this.config.redisPrefix,
        userId,
      );

      await this.cacheManager.set(
        redisKey,
        JSON.stringify(keyToken),
        this.config.ttl,
      );

      return { accessToken, refreshToken };
    } catch {
      throw new InternalServerError("Failed to store key token in Redis");
    }
  }

  /**
   * Retrieves the KeyToken for a specific user from Redis.
   * @param userId - The ID of the user whose KeyToken to retrieve.
   * @returns A promise resolving to the KeyToken or null if not found.
   */
  public async getKeyToken(userId: string): Promise<KeyToken | null> {
    const redisKey = this.keyTokenUtil.getKeyTokenRedisKey(
      this.config.redisPrefix,
      userId,
    );

    const keyTokenStr = await this.cacheManager.get<string>(redisKey);
    if (!keyTokenStr) {
      return null;
    }

    try {
      return JSON.parse(keyTokenStr) as KeyToken;
    } catch {
      return null;
    }
  }
}
