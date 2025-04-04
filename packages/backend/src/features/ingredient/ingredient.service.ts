import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { Ingredient } from '../../database/models/ingredient.entity';
import { getSimilarNames } from '../../utils/filters/similaritySearch';

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

  async findAllWithSimilarName(name: string): Promise<string[] | null> {
    return await getSimilarNames(name, "ingredients", 3, this.em);
  }

  async updateOne(id: number, data: Partial<Ingredient>): Promise<Ingredient> {
    // recover current db ingredient
    let dbIngredient: Ingredient | null = await this.findOne(id);
    if (!dbIngredient) {
      throw new Error("Ingredient not found for update !");
    }
    // update the ingredient in database with the new data
    Object.assign(dbIngredient, data);
    await this.em.flush();
    return dbIngredient;
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
