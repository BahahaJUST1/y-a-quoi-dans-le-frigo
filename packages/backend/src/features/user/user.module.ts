import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../../database/models/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../../auth/auth.module';
import { AuthService } from '../../auth/auth.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService
  ]
})
export class UserModule {}
