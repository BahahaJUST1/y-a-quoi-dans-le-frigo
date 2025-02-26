import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Dish } from '../../database/models/dish.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Dish])],
  controllers: [DishController],
  providers: [DishService]
})
export class DishModule {}
