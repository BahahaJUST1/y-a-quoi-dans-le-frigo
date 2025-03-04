import { Controller, Get, UseGuards } from '@nestjs/common';
import { DishIngredientService } from './dish_ingredient.service';
import { DishIngredient } from '../../database/models/dish_ingredient.entity';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('dish-ingredient')
export class DishIngredientController {
  constructor(private readonly dishIngredientService: DishIngredientService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<DishIngredient[]> {
    return await this.dishIngredientService.findAll();
  }
}
