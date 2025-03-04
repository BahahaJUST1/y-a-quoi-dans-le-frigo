import { Controller, Get, UseGuards } from '@nestjs/common';
import { IngredientCategoryService } from './ingredient_category.service';
import { IngredientCategory } from '../../database/models/ingredient_category.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('ingredient-category')
export class IngredientCategoryController {
  constructor(private readonly ingredientCategoryService: IngredientCategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<IngredientCategory[]> {
    return await this.ingredientCategoryService.findAll();
  }
}
