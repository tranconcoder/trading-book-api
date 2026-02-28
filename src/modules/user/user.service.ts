import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { type SyncUserDto } from "./dto/sync-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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

    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
