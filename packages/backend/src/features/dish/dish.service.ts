import { Injectable } from '@nestjs/common';
import { Dish } from '../../database/models/dish.entity';
import { EntityManager } from '@mikro-orm/mysql';
import { DishIngredientService } from '../dish_ingredient/dish_ingredient.service';
import { RawDishIngredientType } from '../../utils/types/raw_dish_ingredient.type';
import { DishIngredient } from '../../database/models/dish_ingredient.entity';
import { getSimilarNames } from '../../utils/filters/similaritySearch';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DishService {
  constructor(
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
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

  async findAllWithIngredients(ingredientIdsList: number[]): Promise<Dish[] | null> {
    try {
      if (!ingredientIdsList.length) {
        return await this.findAll();
      }

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

  async findAllWithSimilarName(name: string, token: string): Promise<string[] | null> {
    const userId = (this.jwtService.verify(token)).sub;
    return await getSimilarNames(name, "dishes", 3, this.em, userId);
  }

  async likeOrUnlikeDish(id: number): Promise<void> {
    const dish: Dish | null = await this.findOne(id);
    if (!dish) {
      throw Error(`No dish found in database with id ${id} !`);
    }

    dish.favourite = !dish.favourite;
    await this.em.flush();
  }

  async createOne(dish: Dish): Promise<Dish> {
    const newDish = this.em.create(Dish, dish);
    await this.em.flush();
    return newDish;
  }

  async createRecipe(dishData: Dish, dishIngredientsData: Partial<DishIngredient>[]): Promise<void> {
    if (!dishIngredientsData.length) {
      throw new Error("Error, no dish-ingredients provided while creating this dish recipe !")
    }

    // first, create dish
    const newDish: Dish = await this.createOne(dishData);

    // then create all the dish_ingredients
    for (const dishIngredient of dishIngredientsData) {
      await this.dishIngredientService.createOne({
        ...dishIngredient,
        dish: newDish
      } as DishIngredient);
    }
  }
}
