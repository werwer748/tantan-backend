import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/*
미들웨어
공식문서에서는 미들웨어는 라우트 헨들러 전에 실행되는 함수라고 설명하고 있다.
express의 미들웨어와 동일하다고 보면 된다.
*/

@Injectable() // DI가 가능하다.
export class LoggerMiddleware implements NestMiddleware {
  //* nest 답게 써보기. => nest는 로거를 쓸때 로거라는 클래스를 제공해준다.
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    // app.use()의 콜백함수와 동일하다. 모양도 비슷함.. 타입도 express!!
    // this.logger.log(`${req.ip} ${req.method}`, req.originalUrl); // 훨씬 보기 좋게 찍힘
    // console.log(req.ip);
    // console.log(req.originalUrl);

    // 리스폰스가 완료가 됐을 때 로그 찍기
    res.on('finish', () => {
      this.logger.log(
        `${req.ip} ${req.method} ${res.statusCode}`,
        req.originalUrl,
      );
    });
    next();
  }
}
