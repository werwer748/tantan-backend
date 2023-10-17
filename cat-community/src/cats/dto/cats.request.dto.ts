import { PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

/*
    class를 사용하면 데코레이터를 사용할 수 있다.
    상속을 통한 재사용성의 증가도 가능함.
*/

//* 상속을 통해 재사용한 예
export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
/*
//* schema의 class를 재사용하여 상속받기 전.
export class CatRequestDto {
  @ApiProperty({
    example: 'soju@naver.com',
    description: '이메일',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'soju',
    description: '고양이 이름',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
*/
