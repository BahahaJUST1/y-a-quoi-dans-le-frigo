import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { DishIngredientService } from './dish_ingredient.service';
import { DishIngredient } from '../../database/models/dish_ingredient.entity';
import { JwtAuthGuard } from '../../decorators/guards/jwt-auth.guard';
import { DatabaseResponseUserInterceptor } from '../../decorators/interceptors/database-response-user.interceptor';

@Controller('dish-ingredient')
@UseGuards(JwtAuthGuard)
@UseInterceptors(DatabaseResponseUserInterceptor)
export class DishIngredientController {
  constructor(private readonly dishIngredientService: DishIngredientService) {}

  @Get()
  async findAll(): Promise<DishIngredient[]> {
    return await this.dishIngredientService.findAll();
  }

  @Get("/dish/:dishId")
  async findByDishId(@Param('dishId') dishId: number): Promise<DishIngredient[] | null> {
    return await this.dishIngredientService.findByDishId(dishId);
  }
}
