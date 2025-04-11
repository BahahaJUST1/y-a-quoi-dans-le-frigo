import { Body, Controller, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { DishService } from './dish.service';
import { Dish } from '../../database/models/dish.entity';
import { JwtAuthGuard } from '../../decorators/guards/jwt-auth.guard';
import { DatabaseResponseUserInterceptor } from '../../decorators/interceptors/database-response-user.interceptor';
import { DishIngredient } from '../../database/models/dish_ingredient.entity';
import { UserIdInterceptor } from '../../decorators/interceptors/user-id.interceptor';
import { User } from '../../database/models/user.entity';

@Controller('dish')
@UseGuards(JwtAuthGuard)
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  @UseInterceptors(DatabaseResponseUserInterceptor)
  async findAll(): Promise<Dish[]> {
    return await this.dishService.findAll();
  }

  @Post("/ingredients")
  @UseInterceptors(DatabaseResponseUserInterceptor)
  async findAllWithIngredients(
    @Body("ingredientIdsList") ingredientIdsList: number[]
  ): Promise<Dish[] | null> {
    return await this.dishService.findAllWithIngredients(ingredientIdsList);
  }

  @Get("/:id")
  @UseInterceptors(DatabaseResponseUserInterceptor)
  async findOne(@Param('id') id: number): Promise<Dish | null> {
    return await this.dishService.findOne(id);
  }

  @Put("/like/:id")
  async likeOrUnlikeDish(@Param('id') id: number): Promise<void> {
    await this.dishService.likeOrUnlikeDish(id);
  }

  @Post()
  async createOne(@Body() body: Dish): Promise<Dish> {
    return await this.dishService.createOne(body);
  }

  @Post("/recipe")
  @UseInterceptors(UserIdInterceptor)
  async createRecipe(@Body() body: {
    dishData: Dish,
    dishIngredientsData: Partial<DishIngredient>[]
    user: User
  }): Promise<void> {
    body.dishData.user = body.user;
    return await this.dishService.createRecipe(body.dishData, body.dishIngredientsData);
  }

  @Post("/similar/:name")
  async findAllWithSimilarName(
    @Param('name') name: string,
    @Body() body: { bearer: string }
  ): Promise<string[] | null> {
    return await this.dishService.findAllWithSimilarName(name, body.bearer);
  }
}
