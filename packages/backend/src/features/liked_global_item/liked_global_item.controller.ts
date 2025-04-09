import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../../decorators/guards/jwt-auth.guard';
import { UserIdInterceptor } from '../../decorators/interceptors/user-id.interceptor';
import { LikedGlobalItem } from '../../database/models/liked_global_item';
import { LikedGlobalItemService } from './liked_global_item.service';

@Controller('liked-global-item')
@UseGuards(JwtAuthGuard)
export class LikedGlobalItemController {
  constructor(private readonly likedGlobalItemService: LikedGlobalItemService) {}

  @Post()
  @UseInterceptors(UserIdInterceptor)
  async createOne(@Body() body: LikedGlobalItem): Promise<LikedGlobalItem> {
    return await this.likedGlobalItemService.createOne(body);
  }

  @Post("/find-all")
  @UseInterceptors(UserIdInterceptor)
  async findAll(@Body() body: Partial<LikedGlobalItem>): Promise<LikedGlobalItem[] | null> {
    return await this.likedGlobalItemService.findAll(body);
  }
}
