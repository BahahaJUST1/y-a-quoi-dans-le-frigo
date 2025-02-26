import { Controller, Get } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from '../../database/models/ingredient.entity';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientService.findAll();
  }
}
