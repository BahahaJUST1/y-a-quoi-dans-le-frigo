import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from '../auth/auth.module';
import { LikedGlobalItem } from '../../database/models/liked_global_item';
import { LikedGlobalItemService } from './liked_global_item.service';
import { LikedGlobalItemController } from './liked_global_item.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature([LikedGlobalItem]),
    AuthModule
  ],
  providers: [LikedGlobalItemService],
  controllers: [LikedGlobalItemController]
})
export class LikedGlobalItemModule {}
