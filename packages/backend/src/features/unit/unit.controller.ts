import { Controller, Get, UseGuards } from '@nestjs/common';
import { UnitService } from './unit.service';
import { Unit } from '../../database/models/unit.entity';
import { JwtAuthGuard } from '../../decorators/guards/jwt-auth.guard';

@Controller('unit')
@UseGuards(JwtAuthGuard)
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  async findAll(): Promise<Unit[]> {
    return await this.unitService.findAll();
  }
}
