import { Controller, Get } from '@nestjs/common';
import { DishIngredientService } from './dish_ingredient.service';
import { DishIngredient } from '../../database/models/dish_ingredient.entity';

@Controller('dish-ingredient')
export class DishIngredientController {
  constructor(private readonly dishIngredientService: DishIngredientService) {}

  @Get()
  async findAll(): Promise<DishIngredient[]> {
    return await this.dishIngredientService.findAll();
  }
}
