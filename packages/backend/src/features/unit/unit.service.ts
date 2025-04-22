import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { Unit } from '../../database/models/unit.entity';

@Injectable()
export class UnitService {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<Unit[]> {
    try {
      return await this.em.findAll(Unit, { where: { deletedAt: { $eq: null } } });
    }
    catch (e) {
      throw e;
    }
  }

  async findOne(id: number): Promise<Unit | null> {
    try {
      return await this.em.findOne(Unit, { id });
    }
    catch (e) {
      throw e;
    }
  }
}
