import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { User } from '../../database/models/user.entity';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
    private readonly authService: AuthService,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.em.findAll(User, { where: { deletedAt: { $eq: null } } });
    }
    catch (e) {
      throw e;
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      return await this.em.findOne(User, { id });
    }
    catch (e) {
      throw e;
    }
  }

  async login(id: number): Promise<string> {
    const user = await this.findOne(id);
    if (!user) {
      throw Error(`User ${id} not found`);
    }
    const jwtSignature = await this.authService.login(user);
    return jwtSignature.access_token;
  }
}
