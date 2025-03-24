import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { Ingredient } from '../../database/models/ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Ingredient[]> {
    try {
      return await this.em.find(Ingredient,
        { deletedAt: { $eq: null } },
        { populate: ["category"] }
      );
    }
    catch (e) {
      throw e;
    }
  }

  async findOne(id: number): Promise<Ingredient | null> {
    try {
      return await this.em.findOne(Ingredient, { id });
    }
    catch (e) {
      throw e;
    }
  }

  async findAllByCategories(categoryIdsList: number[]): Promise<Ingredient[] | null> {
    if (!categoryIdsList.length) {
      throw new Error("No categories provided !");
    }

    return await this.em.find(Ingredient, {
      category: { $in: categoryIdsList },
    });
  }

  async likeOrUnlikeDish(id: number): Promise<void> {
    const ingredient: Ingredient | null = await this.findOne(id);
    if (!ingredient) {
      throw Error(`No ingredient found in database with id ${id} !`);
    }

    ingredient.favourite = !ingredient.favourite;
    await this.em.flush();
  }

  async createOne(ingredient: Ingredient): Promise<Ingredient> {
    const newIngredient = this.em.create(Ingredient, ingredient);
    await this.em.flush();
    return newIngredient;
  }
}
