import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { CatsRepository } from 'src/cats/cats.repository';

@Injectable() // jwt 전략
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더 토큰에서 jwt 추출
      secretOrKey: process.env.JWT_SECRET, // JwtModule.register에서 secret으로 넣어준 것과 동일해야함
      ignoreExpiration: false, // jwt는 만료기간이 있다. 이를 passport가 검사하도록 하는 옵션
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );

    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
