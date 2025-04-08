import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../../decorators/guards/jwt-auth.guard';
import { DeletedGlobalItemService } from './deleted_global_item.service';
import { UserIdInterceptor } from '../../decorators/interceptors/user-id.interceptor';
import { DeletedGlobalItem } from '../../database/models/deleted_global_items';

@Controller('deleted-global-item')
@UseGuards(JwtAuthGuard)
export class DeletedGlobalItemController {
  constructor(private readonly deletedGlobalItemService: DeletedGlobalItemService) {}

  @Post()
  @UseInterceptors(UserIdInterceptor)
  async createOne(@Body() body: DeletedGlobalItem) {
    return await this.deletedGlobalItemService.createOne(body);
  }
}
