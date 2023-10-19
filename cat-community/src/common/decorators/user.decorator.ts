import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/*
커스텀 데코레이터를 만들어서 사용
*/

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
