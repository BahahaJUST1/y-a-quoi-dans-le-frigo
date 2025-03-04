import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { Ingredient } from '../../database/models/ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Ingredient[]> {
    try {
      return await this.em.findAll(Ingredient, { where: { deletedAt: { $eq: null } } });
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
      throw new Error("Error, no categories provided !");
    }

    return await this.em.find(Ingredient, {
      category: { $in: categoryIdsList },
    });
  }
}
