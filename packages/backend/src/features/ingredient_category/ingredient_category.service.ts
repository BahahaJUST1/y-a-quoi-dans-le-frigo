import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { IngredientCategory } from '../../database/models/ingredient_category.entity';

@Injectable()
export class IngredientCategoryService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<IngredientCategory[]> {
    try {
      return await this.em.findAll(IngredientCategory, { where: { deletedAt: { $eq: null } } });
    }
    catch (e) {
      throw e;
    }
  }

  async findOne(id: number): Promise<IngredientCategory | null> {
    try {
      return await this.em.findOne(IngredientCategory, { id });
    }
    catch (e) {
      throw e;
    }
  }
}
