import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, mergeMap } from 'rxjs';
import { DeletedGlobalItemService } from '../../features/deleted_global_item/deleted_global_item.service';
import { DeletedGlobalItem } from '../../database/models/deleted_global_item';
import { GlobalItemType } from '../../utils/enums/global_item.type';


/**********************************************************************************************
 * This Interceptor is meant to recover every result from db query (ingredients, dishes, ...) *
 * and filter those from current user OR those which are global items                         *
 **********************************************************************************************/


@Injectable()
export class DatabaseResponseUserInterceptor implements NestInterceptor {

  @Inject() private readonly deletedGlobalItemService: DeletedGlobalItemService;

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return next.handle().pipe(
      mergeMap(async (data) => {
        if (Array.isArray(data)) {
          const filteredItems: any[] = [];

          for (const item of data) {
            if (item.isGlobalItem) {
              // return global item only if not deleted by user
              const potentialGlobalItem: DeletedGlobalItem | null =
                await this.deletedGlobalItemService.findOne(
                  user.sub,
                  GlobalItemType.INGREDIENT,
                  item.id
                );
              if (!potentialGlobalItem) {
                filteredItems.push(item);
              }
            }
            // return item if the owner is the current user
            else if (item.user.id === user.sub) {
              filteredItems.push(item);
            }
          }
          return filteredItems;
        }
        return data;
      })
    );
  }
}