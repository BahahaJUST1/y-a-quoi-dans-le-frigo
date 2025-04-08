import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Dish } from '../../database/models/dish.entity';
import { DishIngredientModule } from '../dish_ingredient/dish_ingredient.module';
import { DishIngredientService } from '../dish_ingredient/dish_ingredient.service';
import { AuthModule } from '../auth/auth.module';
import { DeletedGlobalItemModule } from '../deleted_global_item/deleted_global_item.module';
import { DeletedGlobalItemService } from '../deleted_global_item/deleted_global_item.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Dish]),
    DeletedGlobalItemModule,
    DishIngredientModule,
    AuthModule
  ],
  controllers: [DishController],
  providers: [
    DishService,
    DeletedGlobalItemService,
    DishIngredientService
  ]
})
export class DishModule {}
