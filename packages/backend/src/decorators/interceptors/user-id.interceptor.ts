import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';


/**********************************************************************************
 * This Interceptor is meant to automatically add the user ID to the request body *
 **********************************************************************************/


@Injectable()
export class UserIdInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // recover JWT token
    const authHeader = request.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1]; // remove 'Bearer' prefix

      try {
        const decoded = this.jwtService.verify(token);

        // add userId to request
        if (request.body) {
          request.body.user = decoded.sub;
        }
      } catch (error) {
        console.error('Error while decoding JWT token', error);
      }
    }

    return next.handle();
  }
}