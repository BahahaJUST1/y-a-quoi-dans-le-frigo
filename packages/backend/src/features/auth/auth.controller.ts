import { Body, Controller, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Inject() private readonly userService: UserService;

  @Post("/login")
  async login(
    @Body("email") email: string,
    @Body("password") password: string
  ) {
    // recover user
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException;
    }

    // check if password is good
    const checkUserPassword = await this.userService.checkUserPassword(password, user.password);
    if (!checkUserPassword) {
      throw new UnauthorizedException;
    }

    // generate jwt access token
    const jwtSignature = await this.authService.login(user);
    return jwtSignature.access_token;
  }
}