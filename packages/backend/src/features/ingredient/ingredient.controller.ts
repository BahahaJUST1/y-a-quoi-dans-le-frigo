import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from '../../database/models/ingredient.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/categories")
  async findAllByCategories(@Body() body: { categoryIdsList: number[] }): Promise<Ingredient[] | null> {
    return await this.ingredientService.findAllByCategories(body.categoryIdsList);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  async findOne(@Param('id') id: number): Promise<Ingredient | null> {
    return await this.ingredientService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put("/like/:id")
  async likeOrUnlikeDish(@Param('id') id: number): Promise<void> {
    await this.ingredientService.likeOrUnlikeDish(id);
  }
}
