import { Injectable } from '@nestjs/common';
import { Dish } from '../../database/models/dish.entity';
import { EntityManager } from '@mikro-orm/mysql';
import { DishIngredientService } from '../dish_ingredient/dish_ingredient.service';
import { RawDishIngredientType } from '../../utils/types/raw_dish_ingredient.type';

@Injectable()
export class DishService {
  constructor(
    private readonly em: EntityManager,
    private readonly dishIngredientService: DishIngredientService,
  ) {}

  async findAll(): Promise<Dish[]> {
    try {
      return await this.em.findAll(Dish, { where: { deletedAt: { $eq: null } } });
    }
    catch (e) {
      throw e;
    }
  }

  async findOne(id: number): Promise<Dish | null> {
    try {
      return await this.em.findOne(Dish, { id });
    }
    catch (e) {
      throw e;
    }
  }

  async findRandomDish(): Promise<Dish> {
    try {
      const activeDishes = await this.findAll();
      const numberOfDishes = activeDishes.length;
      const randomIndex = Math.floor(Math.random() * numberOfDishes);
      return activeDishes[randomIndex];
    }
    catch (e) {
      throw e;
    }
  }

  async findAllWithIngredients(ingredientIdsList: number[]): Promise<Dish[] | null> {
    try {
      const dishIngredientList: RawDishIngredientType[] = await this.dishIngredientService.findAllWithIngredients(ingredientIdsList);
      const dishes: Dish[] = [];

      if (!dishIngredientList.length) {
        return null;
      }

      for (const dishIngredient of dishIngredientList) {
        const dish = await this.findOne(dishIngredient.dish_id);
        if (dish) {
          dishes.push(dish);
        }
      }

      return dishes;
    }
    catch (e) {
      throw e;
    }
  }

  async findAllByCookingTime(time: number): Promise<Dish[] | null> {
    try {
      return await this.em.find(Dish, {
        preparationTime: { $lte: time },
      });
    }
    catch (e) {
      throw e;
    }
  }
}
