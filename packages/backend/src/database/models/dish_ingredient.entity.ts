import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Dish } from './dish.entity';
import { Ingredient } from './ingredient.entity';
import { Unit } from './unit.entity';
import { User } from './user.entity';

@Entity({ tableName: "dishes_ingredients" })
export class DishIngredient {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Dish)
  dish!: Dish;

  @ManyToOne(() => Ingredient)
  ingredient!: Ingredient;

  @Property()
  quantity!: number;

  @ManyToOne(() => Unit)
  unit!: Unit;

  @ManyToOne(() => User)
  user!: User;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Property({ type: 'date' })
  updatedAt: Date = new Date();

  @Property({ type: 'date', nullable: true })
  deletedAt?: Date;
}