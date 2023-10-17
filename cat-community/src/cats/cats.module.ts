import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat, CatSchema } from 'src/cats/cats.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsRepository } from './cats.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    /*
    Cat.name 부분은 'Cat' 으로 바꿔써도 동일
    .name은 함수의 이름을 반환하는 읽기전용 프로퍼티
    */
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository], // 은닉화 되어있는것을 public으로 바꿔준 것.
  /*
  exports: 다른 모듈에서 CatsService 를 사용할 수 있게 해준다.
  모듈은 기본적으로 공급자(Provider)를 캡슐화하는데 exports를 통해 공급자를 외부로 노출시킬 수 있다.
  */
})
export class CatsModule {}
