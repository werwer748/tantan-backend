import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // 은닉화 되어있는것을 public으로 바꿔준 것.
  /*
  exports: 다른 모듈에서 CatsService 를 사용할 수 있게 해준다.
  모듈은 기본적으로 공급자(Provider)를 캡슐화하는데 exports를 통해 공급자를 외부로 노출시킬 수 있다.
  */
})
export class CatsModule {}
