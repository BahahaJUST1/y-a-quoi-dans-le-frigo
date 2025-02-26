import { Controller, Get } from '@nestjs/common';
import { IngredientCategoryService } from './ingredient_category.service';
import { IngredientCategory } from '../../database/models/ingredient_category.entity';

@Controller('ingredient-category')
export class IngredientCategoryController {
  constructor(private readonly ingredientCategoryService: IngredientCategoryService) {}

  @Get()
  async findAll(): Promise<IngredientCategory[]> {
    return await this.ingredientCategoryService.findAll();
  }
}
