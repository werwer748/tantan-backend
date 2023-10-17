인터셉터?

인터셉터는 @Injectable() 데코레이터로 주석이 달린 클래스. 인터셉터는 NestInterceptor 인터페이스를 구현해야 한다.

인터셉터는 AOP (Aspect Oriented Programming) 기술에서 영감을 받았다..?

AOP? 관점 지향 프로그래밍. 모듈성을 증가시키는것이 목적인 프로그래밍 패러다임

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
console.log('Before...'); -- 컨트롤러 시작전

        const now = Date.now();
        return next
        .handle()
        .pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`)),
            -- post-request는 rxjs를 사용한 문법으로 사용 됨
        );

    }

}

코드를 보면 Before... 와 After가 있는데 컨트롤러의 시작과 끝부분을 나눠서 코딩을 할 수 있다.

리퀘스트 라이프 사이클 순서
Incoming request
Middleware
2.1. Globally bound middleware
2.2. Module bound middleware
Guards
3.1 Global guards
3.2 Controller guards
3.3 Route guards
Interceptors (pre-controller) - 컨트롤러 시작 전
4.1 Global interceptors
4.2 Controller interceptors
4.3 Route interceptors
Pipes
5.1 Global pipes
5.2 Controller pipes
5.3 Route pipes
5.4 Route parameter pipes
Controller (method handler)
Service (if exists)
Interceptors (post-request) - 컨트롤러 종료 후
8.1 Route interceptor
8.2 Controller interceptor
8.3 Global interceptor
Exception filters
9.1 route
9.2 controller
9.3 global
Server response
