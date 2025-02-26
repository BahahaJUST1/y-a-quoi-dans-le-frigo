import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { User } from '../../database/models/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.em.findAll(User, { where: { deletedAt: { $eq: null } } });
    }
    catch (e) {
      throw e;
    }
  }
}
