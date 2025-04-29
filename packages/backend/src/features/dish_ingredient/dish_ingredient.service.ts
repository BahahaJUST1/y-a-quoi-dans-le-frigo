import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { DishIngredient } from '../../database/models/dish_ingredient.entity';
import { RawDishIngredientType } from '../../utils/types/raw_dish_ingredient.type';

@Injectable()
export class DishIngredientService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<DishIngredient[]> {
    try {
      return await this.em.findAll(DishIngredient, { where: { deletedAt: { $eq: null } } });
    }
    catch (e) {
      throw e;
    }
  }

  async findByDishId(dishId: number): Promise<DishIngredient[]> {
    try {
      return await this.em.find(DishIngredient,
        {
          dish: dishId,
          deletedAt: { $eq: null }
        },
        { populate: ['ingredient', 'unit', 'ingredient.category'] }
      );
    }
    catch (e) {
      throw e;
    }
  }

  async findAllWithIngredients(ingredientIdsList: number[]): Promise<RawDishIngredientType[]> {
   try {
      const formatedIds = ingredientIdsList.map((id) => id).join(',');
      return await this.em.execute(`
          SELECT dish_id
          FROM dishes_ingredients
          WHERE ingredient_id IN (${formatedIds})
          GROUP BY dish_id
          HAVING COUNT(DISTINCT ingredient_id) = ${ingredientIdsList.length};
      `);
    }
    catch (e) {
      throw e;
    }
  }

  async createOne(dishIngredient: DishIngredient): Promise<DishIngredient> {
    const newDishIngredient = this.em.create(DishIngredient, dishIngredient);
    await this.em.flush();
    return newDishIngredient;
  }

  async updateOne(id: number, data: Partial<DishIngredient>): Promise<void> {
    await this.em.nativeUpdate(
      DishIngredient,
      { id },
      data
    );
  }

  async deleteOne(id: number): Promise<void> {
    await this.em.nativeUpdate(
      DishIngredient,
      { id },
      { deletedAt: new Date() }
    );
  }
}
