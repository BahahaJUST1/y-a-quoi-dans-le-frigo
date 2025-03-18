import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { IngredientCategoryService } from './ingredient_category.service';
import { IngredientCategory } from '../../database/models/ingredient_category.entity';
import { JwtAuthGuard } from '../../decorators/guards/jwt-auth.guard';

@Controller('ingredient-category')
@UseGuards(JwtAuthGuard)
export class IngredientCategoryController {
  constructor(private readonly ingredientCategoryService: IngredientCategoryService) {}

  @Get()
  async findAll(): Promise<IngredientCategory[]> {
    return await this.ingredientCategoryService.findAll();
  }

  @Get("/:id")
  async findOne(@Param('id') id: number): Promise<IngredientCategory | null> {
    return await this.ingredientCategoryService.findOne(id);
  }
}
