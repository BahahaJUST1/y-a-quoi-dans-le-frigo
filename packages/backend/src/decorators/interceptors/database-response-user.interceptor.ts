import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class DatabaseResponseUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          // recover every result from db query (ingredients, dishes, ...)
          // and filter those from current user
          return data.filter((result) => result.user.id === user.sub);
        }
        return data;
      })
    )
  }
}