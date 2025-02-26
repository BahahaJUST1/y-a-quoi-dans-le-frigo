import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { UserRoleEnum } from '../../../utils/enums/user_role.enum';

@Entity({ tableName: "users" })
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  role!: UserRoleEnum;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Property({ type: 'date' })
  updatedAt: Date = new Date();

  @Property({ type: 'date', nullable: true })
  deletedAt?: Date;
}