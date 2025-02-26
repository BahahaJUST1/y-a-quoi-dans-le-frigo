import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { DishIngredient } from '../../database/models/dish_ingredient.entity';

@Injectable()
export class DishIngredientService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<DishIngredient[]> {
    try {
      return await this.em.findAll(DishIngredient, {});
    }
    catch (e) {
      throw e;
    }
  }
}
