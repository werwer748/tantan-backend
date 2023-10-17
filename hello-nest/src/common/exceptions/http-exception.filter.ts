import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// 매번 에러 처리마다 HttpExceptionFilter를 불러쓰는 것보다 이렇게 쓰는것이 편하다 (재사용에 유리함)

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 실행 환경에 대한 컨텍스트
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as  // 에러 내용
      | string
      | { error: string; statusCode: number; message: string | string[] }; // 이런식으로 타이핑 해줄 수 있다.

    if (typeof error === 'string') {
      // 에러가 발생시 보내는 방법에 대한 분기처리 방법
      response.status(status).json({
        // 직접 인자를 넣어서 발생 시킨 에러
        /* 원하는 에러 내용을 보낼 수 있다. */
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {
      response.status(status).json({
        // nest에서 발생시킨 에러 (404라던지..)
        success: false,
        timestamp: new Date().toISOString(),
        ...error,
      });
    }
  }
}
