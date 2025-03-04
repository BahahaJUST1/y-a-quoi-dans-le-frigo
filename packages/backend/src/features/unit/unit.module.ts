import { Module } from '@nestjs/common';
import { UnitController } from './unit.controller';
import { UnitService } from './unit.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Unit } from '../../database/models/unit.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([Unit]),
    AuthModule
  ],
  controllers: [UnitController],
  providers: [UnitService]
})
export class UnitModule {}
