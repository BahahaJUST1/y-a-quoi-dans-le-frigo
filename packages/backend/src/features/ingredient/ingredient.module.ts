import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Ingredient } from '../../database/models/ingredient.entity';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { AuthModule } from '../auth/auth.module';
import { DeletedGlobalItemModule } from '../deleted_global_item/deleted_global_item.module';
import { DeletedGlobalItemService } from '../deleted_global_item/deleted_global_item.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Ingredient]),
    DeletedGlobalItemModule,
    AuthModule
  ],
  controllers: [IngredientController],
  providers: [
    IngredientService,
    DeletedGlobalItemService,
  ],
})
export class IngredientModule {}
