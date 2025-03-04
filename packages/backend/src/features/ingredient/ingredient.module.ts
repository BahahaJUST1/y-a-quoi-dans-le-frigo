import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Ingredient } from '../../database/models/ingredient.entity';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Ingredient]),
    AuthModule
  ],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModule {}
