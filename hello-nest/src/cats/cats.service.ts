import { Injectable } from '@nestjs/common';

@Injectable() //? Injectable() 데코레이터를 사용하면 클래스를 NestJS가 관리하는 Provider로 변환해줌.
export class CatsService {
  hiCatServiceProduct() {
    return 'hello cat!';
  }
}
