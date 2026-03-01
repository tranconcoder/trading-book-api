import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { type SyncUserDto } from "./dto/sync-user.dto";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { type Cache } from "cache-manager";
import { UserUtil } from "../access-control/user.util";
import userConfig, { type UserConfig } from "./user.config";

/**
 * Service handling user data operations, synchronization, and profile retrieval with caching.
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @Inject(userConfig.KEY)
    private readonly config: UserConfig,
    private readonly userUtil: UserUtil,
  ) {}

  /**
   * Synchronizes user data from a third-party provider (e.g., Google).
   * Creates a new user if one doesn't exist, otherwise updates existing information.
   * Invalidates the user's cached profile upon update.
   * @param dto - The user synchronization data.
   * @returns The saved user entity.
   */
  async syncUser(dto: SyncUserDto): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (user) {
      // Update existing user - only update if the new value is not empty
      user.firstName = dto.firstName || user.firstName;
      user.lastName = dto.lastName || user.lastName;
      user.avatar = dto.avatar || user.avatar;
    } else {
      // Create new user
      user = this.userRepository.create({
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        avatar: dto.avatar,
      });
    }

    const savedUser = await this.userRepository.save(user);

    // Invalidate cache on update
    const redisKey = this.userUtil.getUserRedisKey(
      this.config.redisPrefix,
      savedUser.id,
    );
    await this.cacheManager.del(redisKey);

    return savedUser;
  }

  /**
   * Finds a user by their email address.
   * @param email - The email to search for.
   * @returns The user entity or null if not found.
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Retrieves a user's profile, utilizing Redis caching for performance.
   * If the profile is not found in cache, it's fetched from the database and then cached.
   * @param userId - The unique identifier of the user.
   * @returns The user entity with profile data, or null if the user does not exist.
   */
  async getUserProfile(userId: string): Promise<User | null> {
    const redisKey = this.userUtil.getUserRedisKey(
      this.config.redisPrefix,
      userId,
    );

    // 1. Try to get from cache
    const cachedUser = await this.cacheManager.get<string>(redisKey);
    if (cachedUser) {
      try {
        return JSON.parse(cachedUser) as User;
      } catch {
        // If parsing fails, ignore and fetch from DB
      }
    }

    // 2. If not in cache, get from database
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return null;
    }

    // 3. Store to cache
    await this.cacheManager.set(
      redisKey,
      JSON.stringify(user),
      this.config.profileTtl,
    );

    return user;
  }
}
