import { Module } from '@nestjs/common';
import { DishIngredientService } from './dish_ingredient.service';
import { DishIngredientController } from './dish_ingredient.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DishIngredient } from '../../database/models/dish_ingredient.entity';
import { AuthModule } from '../auth/auth.module';
import { DeletedGlobalItemModule } from '../deleted_global_item/deleted_global_item.module';
import { DeletedGlobalItemService } from '../deleted_global_item/deleted_global_item.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([DishIngredient]),
    DeletedGlobalItemModule,
    AuthModule
  ],
  providers: [
    DishIngredientService,
    DeletedGlobalItemService,
  ],
  controllers: [DishIngredientController]
})
export class DishIngredientModule {}
