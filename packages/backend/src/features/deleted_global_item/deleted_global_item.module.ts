import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from '../auth/auth.module';
import { DeletedGlobalItem } from '../../database/models/deleted_global_item';
import { DeletedGlobalItemController } from './deleted_global_item.controller';
import { DeletedGlobalItemService } from './deleted_global_item.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([DeletedGlobalItem]),
    AuthModule
  ],
  providers: [DeletedGlobalItemService],
  controllers: [DeletedGlobalItemController]
})
export class DeletedGlobalItemModule {}
