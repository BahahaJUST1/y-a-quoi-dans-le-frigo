import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class IngredientCategory {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ type: 'date' })
  createdAt: Date = new Date();

  @Property({ type: 'date' })
  updatedAt: Date = new Date();

  @Property({ type: 'date', nullable: true })
  deletedAt?: Date;
}