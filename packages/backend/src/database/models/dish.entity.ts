import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import { User } from './user.entity';
import { DishIngredient } from './dish_ingredient.entity';

@Entity({ tableName: "dishes" })
export class Dish {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ nullable: true })
  preparationTime?: number;

  @Property({ default: 2 })
  numberOfPeople!: number;

  @Property({ default: false })
  favourite: boolean;

  @Property({ nullable: true })
  recipe?: string;

  @Property({ nullable: true })
  image?: string;

  @ManyToOne(() => User)
  user!: User;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Property({ type: 'date' })
  updatedAt: Date = new Date();

  @Property({ type: 'date', nullable: true })
  deletedAt?: Date;
}