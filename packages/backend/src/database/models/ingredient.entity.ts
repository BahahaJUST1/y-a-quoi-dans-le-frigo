import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { IngredientCategory } from './ingredient_category.entity';
import { User } from './user.entity';

@Entity({ tableName: "ingredients" })
export class Ingredient {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @ManyToOne(() => IngredientCategory)
  category!: IngredientCategory;

  @Property({ default: false })
  favourite: boolean;

  @Property({ nullable: true })
  image?: string;

  @Property({ nullable: true })
  bgColor?: string;

  @ManyToOne(() => User)
  user!: User;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Property({ type: 'date' })
  updatedAt: Date = new Date();

  @Property({ type: 'date', nullable: true })
  deletedAt?: Date;
}