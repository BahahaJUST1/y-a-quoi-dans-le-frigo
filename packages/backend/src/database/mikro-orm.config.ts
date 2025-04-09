import { Dish } from './models/dish.entity';
import { DishIngredient } from './models/dish_ingredient.entity';
import { Ingredient } from './models/ingredient.entity';
import { IngredientCategory } from './models/ingredient_category.entity';
import { Unit } from './models/unit.entity';
import { User } from './models/user.entity';
import { Injectable } from '@nestjs/common';
import { MikroOrmModuleOptions, MikroOrmOptionsFactory } from '@mikro-orm/nestjs';
import { ConfigService } from '@nestjs/config';
import { MySqlDriver } from '@mikro-orm/mysql';
import { DeletedGlobalItem } from './models/deleted_global_item';
import { LikedGlobalItem } from './models/liked_global_item';

@Injectable()
export class MikroOrmConfigService implements MikroOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMikroOrmOptions(): MikroOrmModuleOptions {
    return {
      entities: [
        DeletedGlobalItem,
        Dish,
        DishIngredient,
        Ingredient,
        IngredientCategory,
        LikedGlobalItem,
        Unit,
        User
      ],
      dbName: this.configService.get<string>('DB_NAME'),
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASS'),
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      driver: MySqlDriver,
      debug: false
    }
  }
}