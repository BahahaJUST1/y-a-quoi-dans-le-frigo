import { Controller, Get, UseGuards } from '@nestjs/common';
import { UnitService } from './unit.service';
import { Unit } from '../../database/models/unit.entity';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Unit[]> {
    return await this.unitService.findAll();
  }
}
