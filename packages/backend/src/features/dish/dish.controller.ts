import { Body, Controller, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { DishService } from './dish.service';
import { Dish } from '../../database/models/dish.entity';
import { JwtAuthGuard } from '../../decorators/guards/jwt-auth.guard';
import { DatabaseResponseUserInterceptor } from '../../decorators/interceptors/database-response-user.interceptor';

@Controller('dish')
@UseGuards(JwtAuthGuard)
@UseInterceptors(DatabaseResponseUserInterceptor)
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

  @Post("/ingredients")
  async findAllWithIngredients(
    @Body("ingredientIdsList") ingredientIdsList: number[]
  ): Promise<Dish[] | null> {
    return await this.dishService.findAllWithIngredients(ingredientIdsList);
  }

  @Get("/time/:time")
  async findAllByCookingTime(@Param('time') time: number): Promise<Dish[] | null> {
    return await this.dishService.findAllByCookingTime(time);
  }

  @Get("/:id")
  async findOne(@Param('id') id: number): Promise<Dish | null> {
    return await this.dishService.findOne(id);
  }

  @Put("/like/:id")
  async likeOrUnlikeDish(@Param('id') id: number): Promise<void> {
    await this.dishService.likeOrUnlikeDish(id);
  }
}
