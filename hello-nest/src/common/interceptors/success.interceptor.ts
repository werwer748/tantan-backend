import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    // 마지막 순서로 데이터를 가공해 내보내는 방법
    // 일단은 이런식으로 작동한다 정도로 기억하자 data를 넘겨받아서 가공후 다시 넘겨준다.
    return next.handle().pipe(map((data) => ({ success: true, data })));
  }
}
