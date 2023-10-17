import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable() // 가드도 의존성 주입이 가능
export class JwtAuthGuard extends AuthGuard('jwt') {}
