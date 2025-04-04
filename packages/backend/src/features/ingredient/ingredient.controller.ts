import { Body, Controller, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { Ingredient } from '../../database/models/ingredient.entity';
import { JwtAuthGuard } from '../../decorators/guards/jwt-auth.guard';
import { DatabaseResponseUserInterceptor } from '../../decorators/interceptors/database-response-user.interceptor';
import { UserIdInterceptor } from '../../decorators/interceptors/user-id.interceptor';

@Controller('ingredient')
@UseGuards(JwtAuthGuard)
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  @UseInterceptors(DatabaseResponseUserInterceptor)
  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientService.findAll();
  }

  @Get("/categories")
  @UseInterceptors(DatabaseResponseUserInterceptor)
  async findAllByCategories(@Body() body: { categoryIdsList: number[] }): Promise<Ingredient[] | null> {
    return await this.ingredientService.findAllByCategories(body.categoryIdsList);
  }

  @Get("/:id")
  @UseInterceptors(DatabaseResponseUserInterceptor)
  async findOne(@Param('id') id: number): Promise<Ingredient | null> {
    return await this.ingredientService.findOne(id);
  }

  @Get("/similar/:name")
  async findAllWithSimilarName(@Param('name') name: string): Promise<string[] | null> {
    return await this.ingredientService.findAllWithSimilarName(name);
  }

  @Put("/:id")
  @UseInterceptors(UserIdInterceptor)
  async updateOne(
    @Param('id') id: number,
    @Body() body: Partial<Ingredient>
  ): Promise<Ingredient> {
    return await this.ingredientService.updateOne(id, body);
  }

  @Put("/like/:id")
  async likeOrUnlikeDish(@Param('id') id: number): Promise<void> {
    await this.ingredientService.likeOrUnlikeDish(id);
  }

  @Post()
  @UseInterceptors(UserIdInterceptor)
  async createOne(@Body() body: Ingredient): Promise<Ingredient> {
    return await this.ingredientService.createOne(body);
  }
}
