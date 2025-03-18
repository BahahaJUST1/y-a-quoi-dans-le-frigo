import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';

@Injectable()
export class ExtraUserMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      try {
        const token = authHeader.split(' ')[1];
        req.user = this.jwtService.verify(token);
      }
      catch (e) {
        throw e;
      }
    }
    next();
  }
}