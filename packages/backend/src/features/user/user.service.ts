import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { User } from '../../database/models/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRoleEnum } from '../../utils/enums/user_role.enum';
import { firstCase } from '../../utils/converters/first-case';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.em.findAll(User, {
        where: { deletedAt: { $eq: null } },
      });
    } catch (e) {
      throw e;
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    try {
      return await this.em.findOne(User, { email });
    } catch (e) {
      throw e;
    }
  }

  async getUserRole(body: any): Promise<UserRoleEnum> {
    const user: User | null = await this.em.findOne(User, {
      id: body.user
    });
    if (!user) {
      throw new Error(`No user found with id ${body.user}`);
    }
    return user.role;
  }

  async generatePassword(plainTextPwd: string): Promise<string> {
    const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT_ROUND!));
    return bcrypt.hashSync(plainTextPwd, salt);
  }

  async checkUserPassword(
    plainTextPwd: string,
    encryptedPwd: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPwd, encryptedPwd);
  }

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<User> {
    const encryptedPassword = await this.generatePassword(password);
    const user = this.em.create(User, {
      firstName: firstCase(firstName),
      lastName: lastName.toUpperCase(),
      email,
      password: encryptedPassword,
      role: UserRoleEnum.USER,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await this.em.flush();
    return user;
  }
}
