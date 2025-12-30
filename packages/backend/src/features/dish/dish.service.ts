import { Injectable } from '@nestjs/common';
import { Dish } from '../../database/models/dish.entity';
import { EntityManager } from '@mikro-orm/mysql';
import { DishIngredientService } from '../dish_ingredient/dish_ingredient.service';
import { RawDishIngredientType } from '../../utils/types/raw_dish_ingredient.type';
import { DishIngredient } from '../../database/models/dish_ingredient.entity';
import { getSimilarNames } from '../../utils/filters/similaritySearch';
import { JwtService } from '@nestjs/jwt';
import { Ingredient } from '../../database/models/ingredient.entity';
import { Unit } from '../../database/models/unit.entity';
import { User } from '../../database/models/user.entity';
import { firstCase } from '../../utils/converters/first-case';

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
    const newDish = this.em.create(Dish, {
      ...dish,
      name: firstCase(dish.name)
    });
    await this.em.flush();
    return newDish;
  }

  async createRecipe(
    dishData: Partial<Dish>,
    dishIngredientsData: Partial<DishIngredient>[],
    user: User
  ): Promise<void> {
    if (!dishIngredientsData.length) {
      throw new Error("Error, no dish-ingredients provided while creating this dish recipe !")
    }

    // first, create dish
    const newDish: Dish = await this.createOne({
      ...dishData,
      user
    } as Dish);

    // then create all the dish_ingredients
    for (const dishIngredient of dishIngredientsData) {
      // recover the unit reference from its id to avoid Mikro-ORM to re-create one
      const unit: Unit = this.em.getReference(Unit, dishIngredient.unit!.id)

      // recover the ingredient reference instead of full ingredient
      // otherwise Mikro-ORM will try to re-create an ingredient-category
      const ingredient: Ingredient = this.em.getReference(Ingredient, dishIngredient.ingredient!.id);

      await this.dishIngredientService.createOne({
        dish: newDish,
        ingredient,
        quantity: dishIngredient.quantity,
        unit,
        user
      } as DishIngredient);
    }
  }

  async updateOne(
    id: number,
    data: {
      dishData: Partial<Dish>,
      dishIngredientsData: Partial<DishIngredient>[]
      user: User
    }
  ) {
    // recover current dish in db
    const currentDatabaseDish: Dish | null = await this.findOne(id);
    if (!currentDatabaseDish) {
      throw new Error(`No dish found in database with id ${id} !`);
    }

    // update the dish data (name, image, preparationTime, numberOfPeople, recipe)
    await this.em.nativeUpdate(
      Dish,
      { id },
      {
        name: firstCase(data.dishData.name!),
        image: data.dishData.image,
        preparationTime: data.dishData.preparationTime,
        numberOfPeople: data.dishData.numberOfPeople!,
        recipe: data.dishData.recipe
      }
    );

    // recover current dish-ingredients in db
    const currentDatabaseDishIngredients: DishIngredient[] = await this.dishIngredientService.findByDishId(id);

    // browse database dish-ingredients to find if they are still or not in updated values (di update/delete)
    for (const currentDatabaseDishIngredient of currentDatabaseDishIngredients) {

      // check if ingredient is still required in the recipe
      const potentialDishIngredient = data.dishIngredientsData.find((di) => di.ingredient!.id === currentDatabaseDishIngredient.ingredient.id);

      // if still required -> update the dish-ingredient in db if values has changed (quantity, unit)
      if (potentialDishIngredient) {
        await this.dishIngredientService.updateOne(currentDatabaseDishIngredient.id, {
          ...potentialDishIngredient,
          ingredient: this.em.getReference(Ingredient, potentialDishIngredient.ingredient!.id),
          unit: this.em.getReference(Unit, potentialDishIngredient.unit!.id),
          createdAt: currentDatabaseDishIngredient.createdAt,
          updatedAt: new Date()
        });
      }
      // if not required -> set its deleted_at value to new Date()
      else {
        await this.dishIngredientService.deleteOne(currentDatabaseDishIngredient.id);
      }
    }

    // browse new dish-ingredients data to find if they are di not present in database (di create)
    for (const newDishIngredient of data.dishIngredientsData) {

      // check if ingredient was not in the current database recipe
      const potentialDishIngredient = currentDatabaseDishIngredients.find((di) => di.ingredient.id === newDishIngredient.ingredient!.id);

      // if not already in db -> create it
      if (!potentialDishIngredient) {
        await this.dishIngredientService.createOne({
          ...newDishIngredient,
          ingredient: this.em.getReference(Ingredient, newDishIngredient.ingredient!.id),
          user: data.user
        } as DishIngredient);
      }
    }
  }

  async deleteOne(id: number): Promise<Dish> {
    // recover dish to mark as deleted
    let dishToDelete: Dish | null = await this.findOne(id);
    if (!dishToDelete) {
      throw Error(`No dish found in database with id ${id} !`);
    }
    dishToDelete.deletedAt = new Date();
    await this.em.flush();
    return dishToDelete;
  }
}
