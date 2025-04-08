import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './user.entity';
import { GlobalItemType } from '../../utils/enums/global_item.type';

@Entity({ tableName: 'deleted_global_items' })
export class Dish {

  @PrimaryKey()
  @ManyToOne(() => User)
  user!: User;

  @PrimaryKey()
  itemType!: GlobalItemType

  @PrimaryKey()
  itemId!: number

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Property({ type: 'date' })
  updatedAt: Date = new Date();

  @Property({ type: 'date', nullable: true })
  deletedAt?: Date;
}