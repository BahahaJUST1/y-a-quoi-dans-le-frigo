import { Module } from '@nestjs/common';
import { DishIngredientService } from './dish_ingredient.service';
import { DishIngredientController } from './dish_ingredient.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DishIngredient } from '../../database/models/dish_ingredient.entity';

@Module({
  imports: [MikroOrmModule.forFeature([DishIngredient])],
  providers: [DishIngredientService],
  controllers: [DishIngredientController]
})
export class DishIngredientModule {}
