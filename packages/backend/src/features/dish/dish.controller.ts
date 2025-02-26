import { Body, Controller, Get, Param } from '@nestjs/common';
import { DishService } from './dish.service';
import { Dish } from '../../database/models/dish.entity';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  async findAll(): Promise<Dish[]> {
    return await this.dishService.findAll();
  }

  @Get("/random")
  async findRandomDish(): Promise<Dish> {
    return await this.dishService.findRandomDish();
  }

  @Get("/ingredients")
  async findAllWithIngredients(@Body() body: { ingredientIdsList: number[] }): Promise<Dish[] | null> {
    return await this.dishService.findAllWithIngredients(body.ingredientIdsList);
  }

  @Get("/:id")
  async findOne(@Param('id') id: number): Promise<Dish | null> {
    return await this.dishService.findOne(id);
  }
}
