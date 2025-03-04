import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { DishService } from './dish.service';
import { Dish } from '../../database/models/dish.entity';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Dish[]> {
    return await this.dishService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/random")
  async findRandomDish(): Promise<Dish> {
    return await this.dishService.findRandomDish();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/ingredients")
  async findAllWithIngredients(@Body() body: { ingredientIdsList: number[] }): Promise<Dish[] | null> {
    return await this.dishService.findAllWithIngredients(body.ingredientIdsList);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/time/:time")
  async findAllByCookingTime(@Param('time') time: number): Promise<Dish[] | null> {
    return await this.dishService.findAllByCookingTime(time);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  async findOne(@Param('id') id: number): Promise<Dish | null> {
    return await this.dishService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put("/like/:id")
  async likeOrUnlikeDish(@Param('id') id: number): Promise<void> {
    await this.dishService.likeOrUnlikeDish(id);
  }
}
