import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Dish } from '../../database/models/dish.entity';
import { DishIngredientModule } from '../dish_ingredient/dish_ingredient.module';
import { DishIngredientService } from '../dish_ingredient/dish_ingredient.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Dish]),
    DishIngredientModule,
    AuthModule
  ],
  controllers: [DishController],
  providers: [
    DishService,
    DishIngredientService
  ]
})
export class DishModule {}
