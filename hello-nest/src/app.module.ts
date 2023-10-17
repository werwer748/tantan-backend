import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';

@Module({
  imports: [CatsModule], // imports해온 모듈의 공급자(Provider)를 사용하려면 해당 모듈내부에서 exports를 해야한다.
  controllers: [AppController],
  providers: [AppService],
  // import해온 모듈에서 exports하지 않고 provicers에서 바로 적용해 사용할 수 있지만 좋은 패턴이 아님.
  // 단일책임 원칙에 어긋나기 때문. 관리도 힘들고..
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    /*
      ? forRoutes('cats'); => /cats라우터에 바인딩을 해주는것
      ? /cats로 시작하는 모든 라우트에 미들웨어를 적용하겠다는 의미
      ? forRoutes({ path: 'cats', method: RequestMethod.GET }); => 특정 메서드에만 적용하고 싶을때
      ? forRoutes(CatsController); => 특정 컨트롤러에만 적용하고 싶을때
      ? forRoutes({ path: 'cats', method: RequestMethod.GET }, CatsController); => 특정 컨트롤러의 특정 메서드에만 적용하고 싶을때
      ? forRoutes('*'); => 모든 라우트에 적용하고 싶을때
    */
  }
}
