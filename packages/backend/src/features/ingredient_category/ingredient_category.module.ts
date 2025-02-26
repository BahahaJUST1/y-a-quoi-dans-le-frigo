import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { IngredientCategory } from '../../database/models/ingredient_category.entity';
import { IngredientCategoryService } from './ingredient_category.service';
import { IngredientCategoryController } from './ingredient_category.controller';

@Module({
  imports: [MikroOrmModule.forFeature([IngredientCategory])],
  controllers: [IngredientCategoryController],
  providers: [IngredientCategoryService],
})
export class IngredientCategoryModule {}
