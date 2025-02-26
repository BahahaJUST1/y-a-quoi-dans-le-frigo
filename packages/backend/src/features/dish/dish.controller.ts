import { Controller, Get } from '@nestjs/common';
import { DishService } from './dish.service';
import { Dish } from '../../database/models/dish.entity';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  async findAll(): Promise<Dish[]> {
    return await this.dishService.findAll();
  }
}
