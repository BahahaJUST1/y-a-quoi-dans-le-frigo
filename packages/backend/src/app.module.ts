import { Module } from '@nestjs/common';
import { DishModule } from './features/dish/dish.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmConfigService } from './database/mikro-orm.config';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './database/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      useClass: MikroOrmConfigService
    }),
    DishModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
