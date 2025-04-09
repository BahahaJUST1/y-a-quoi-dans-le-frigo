import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { DeletedGlobalItem } from '../../database/models/deleted_global_item';
import { GlobalItemType } from '../../utils/enums/global_item.type';

@Injectable()
export class DeletedGlobalItemService {
  constructor(private readonly em: EntityManager) {}

  async findOne(userId: number, itemType: GlobalItemType, itemId: number): Promise<DeletedGlobalItem | null> {
    return await this.em.findOne(DeletedGlobalItem, {
      user: userId,
      itemType,
      itemId,
    });
  }

  async createOne(body: DeletedGlobalItem): Promise<DeletedGlobalItem> {
    const deletedGlobalItem = this.em.create(DeletedGlobalItem, body);
    await this.em.flush();
    return deletedGlobalItem;
  }
}
