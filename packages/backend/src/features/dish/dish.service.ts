import { Injectable } from '@nestjs/common';
import { Dish } from '../../database/models/dish.entity';
import { EntityManager } from '@mikro-orm/mysql';

@Injectable()
export class DishService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Dish[]> {
    try {
      return await this.em.findAll(Dish, {});
    }
    catch (e) {
      throw e;
    }
  }
}
