import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';

@Injectable()
export class ExtraUserMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  private readonly logger: Logger = new Logger(ExtraUserMiddleware.name);

  use(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      try {
        const token = authHeader.split(' ')[1];
        req.user = this.jwtService.verify(token);
      }
      catch (e) {
        this.logger.error(e);
        throw new UnauthorizedException('Token expiré');
      }
    }
    next();
  }
}