import { Controller, Get } from '@nestjs/common';
import { UnitService } from './unit.service';
import { Unit } from '../../database/models/unit.entity';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  async findAll(): Promise<Unit[]> {
    return await this.unitService.findAll();
  }
}
