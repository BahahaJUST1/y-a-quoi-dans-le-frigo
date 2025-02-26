import { MikroORM } from '@mikro-orm/core';
import { Dish } from './models/dish.entity';
import { DishIngredient } from './models/dish_ingredient.entity';
import { Ingredient } from './models/ingredient.entity';
import { IngredientCategory } from './models/ingredient_category.entity';
import { Unit } from './models/unit.entity';
import { User } from './models/user.entity';

export default {
  entities: [
    Dish,
    DishIngredient,
    Ingredient,
    IngredientCategory,
    Unit,
    User
  ],
  dbName: process.env.DB_NAME,
  type: 'mysql',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
} as Parameters<typeof MikroORM.init>[0];