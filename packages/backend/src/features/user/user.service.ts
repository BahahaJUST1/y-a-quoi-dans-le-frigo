import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { User } from '../../database/models/user.entity';
import * as bcrypt from 'bcrypt'

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

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      return await this.em.findOne(User, { email });
    }
    catch (e) {
      throw e;
    }
  }

  async generatePassword(plainTextPwd: string): Promise<string> {
    const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT_ROUND!));
    return bcrypt.hashSync(plainTextPwd, salt);
  }

  async checkUserPassword(plainTextPwd: string, encryptedPwd: string): Promise<boolean> {
    return bcrypt.compare(plainTextPwd, encryptedPwd);
  }
}
