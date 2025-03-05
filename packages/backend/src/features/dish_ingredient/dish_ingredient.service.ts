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
        { dish: dishId },
        { populate: ['ingredient', 'unit'] }
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
          SELECT *
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
}
