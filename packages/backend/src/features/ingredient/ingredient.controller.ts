import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from '../../database/models/ingredient.entity';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientService.findAll();
  }

  @Get("/categories")
  async findAllByCategories(@Body() body: { categoryIdsList: number[] }): Promise<Ingredient[] | null> {
    return await this.ingredientService.findAllByCategories(body.categoryIdsList);
  }

  @Get("/:id")
  async findOne(@Param('id') id: number): Promise<Ingredient | null> {
    return await this.ingredientService.findOne(id);
  }

  @Put("/like/:id")
  async likeOrUnlikeDish(@Param('id') id: number): Promise<void> {
    await this.ingredientService.likeOrUnlikeDish(id);
  }
}
