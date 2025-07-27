import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../database/models/user.entity';
import { JwtAuthGuard } from '../../decorators/guards/jwt-auth.guard';
import { UserRoleEnum } from '../../utils/enums/user_role.enum';
import { UserIdInterceptor } from '../../decorators/interceptors/user-id.interceptor';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post('/current/role')
  @UseInterceptors(UserIdInterceptor)
  async getUserRole(@Body() body: any): Promise<UserRoleEnum> {
    return await this.userService.getUserRole(body);
  }

  @Post('/current/id')
  @UseInterceptors(UserIdInterceptor)
  async getUserId(@Body() body: any): Promise<number> {
    return body.user;
  }
}
