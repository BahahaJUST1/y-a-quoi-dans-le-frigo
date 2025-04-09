import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DishModule } from './features/dish/dish.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmConfigService } from './database/mikro-orm.config';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './database/configuration';
import { DishIngredientModule } from './features/dish_ingredient/dish_ingredient.module';
import { IngredientModule } from './features/ingredient/ingredient.module';
import { IngredientCategoryModule } from './features/ingredient_category/ingredient_category.module';
import { UnitModule } from './features/unit/unit.module';
import { UserModule } from './features/user/user.module';
import * as Joi from 'joi';
import { AuthModule } from './features/auth/auth.module';
import { ExtraUserMiddleware } from './decorators/middlewares/extract-user.middleware';
import { CloudinaryModule } from './features/cloudinary/cloudinary.module';
import { DeletedGlobalItemModule } from './features/deleted_global_item/deleted_global_item.module';
import { LikedGlobalItemModule } from './features/liked_global_item/liked_global_item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: Joi.object({
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        BCRYPT_SALT_ROUND: Joi.number().required(),
        CLOUDINARY_NAME: Joi.string().required(),
        CLOUDINARY_KEY: Joi.string().required(),
        CLOUDINARY_SECRET: Joi.string().required(),
      }),
    }),
    MikroOrmModule.forRootAsync({
      useClass: MikroOrmConfigService,
    }),
    AuthModule,
    CloudinaryModule,
    DeletedGlobalItemModule,
    DishModule,
    DishIngredientModule,
    IngredientModule,
    IngredientCategoryModule,
    LikedGlobalItemModule,
    UnitModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExtraUserMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST },
      )
      .forRoutes('/');
  }
}
