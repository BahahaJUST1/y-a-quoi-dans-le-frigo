import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { LikedGlobalItem } from '../../database/models/liked_global_item';

@Injectable()
export class LikedGlobalItemService {
  constructor(private readonly em: EntityManager) {}

  async findAll(body: Partial<LikedGlobalItem>): Promise<LikedGlobalItem[] | null> {
    return await this.em.find(LikedGlobalItem, body);
  }

  async findOne(body: LikedGlobalItem): Promise<LikedGlobalItem | null> {
    return await this.em.findOne(LikedGlobalItem, body);
  }

  async createOne(body: LikedGlobalItem): Promise<LikedGlobalItem> {

    // check if ingredient has already been liked
    const potentialLikedGlobalItem: LikedGlobalItem | null = await this.findOne(body);

    // ingredient not found mean it has never been liked
    if (!potentialLikedGlobalItem) {
      const likedGlobalItem = this.em.create(LikedGlobalItem, body);
      await this.em.flush();
      return likedGlobalItem;
    }
    // ingredient has been liked at least one time
    potentialLikedGlobalItem.deletedAt !== null
      // if deleted_at is NOT null, it has been unliked (we need to like)
      ? potentialLikedGlobalItem.deletedAt = undefined
      // if deleted_at is null, it's still liked (we need to unlike)
      : potentialLikedGlobalItem.deletedAt = new Date();

    await this.em.flush();
    return potentialLikedGlobalItem;
  }
}
