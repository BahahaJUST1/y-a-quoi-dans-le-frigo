import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { IngredientCategory } from './ingredient_category.entity';
import { User } from './user.entity';

@Entity()
export class Ingredient {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @ManyToOne(() => IngredientCategory)
  category!: IngredientCategory;

  @Property({ default: false })
  favourite: boolean;

  @ManyToOne(() => User)
  user!: User;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Property({ type: 'date' })
  updatedAt: Date = new Date();

  @Property({ type: 'date', nullable: true })
  deletedAt?: Date;
}