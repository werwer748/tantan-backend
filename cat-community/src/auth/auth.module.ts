import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CatsModule } from 'src/cats/cats.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }), // 패스포트 전략에 관한 기본 설정
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),

    /*
    직접 import 해오면 CatsModule에서 export한 것들을 사용할 수 있다. 
    이렇게 되면 CatsModule에서 export한 것들을 다른 모듈에서도 사용할 수 있게 된다.
    캡슐화되어 은닉화된 모듈을 public화 해준 것.
    이렇게 안쓰면 providers에 직접 등록해서 사용해야 함.
    */
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
