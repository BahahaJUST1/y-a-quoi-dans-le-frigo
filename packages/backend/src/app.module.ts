import { Module } from '@nestjs/common';
import { DishModule } from './features/dish/dish.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmConfigService } from './database/mikro-orm.config';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './database/configuration';
import { DishIngredientModule } from './features/dish_ingredient/dish_ingredient.module';
import { IngredientModule } from './features/ingredient/ingredient.module';
import { IngredientCategoryModule } from './features/ingredient_category/ingredient_category.module';
import { UnitModule } from './features/unit/unit.module';
import { UserModule } from './features/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      useClass: MikroOrmConfigService
    }),
    DishModule,
    DishIngredientModule,
    IngredientModule,
    IngredientCategoryModule,
    UnitModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
