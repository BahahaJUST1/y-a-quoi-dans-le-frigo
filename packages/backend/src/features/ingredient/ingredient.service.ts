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
}
