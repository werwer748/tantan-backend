import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  //? PickType() : DTO를 생성할 때, 기존의 클래스에서 일부 프로퍼티만 뽑아서 새로운 클래스를 생성할 수 있게 해줌.
  //? as const : readonly 프로퍼티를 생성할 수 있게 해줌.
  //? OmitType() : DTO를 생성할 때, 기존의 클래스에서 일부만 제외하여 새로운 클래스를 생성할 수 있게 해줌.
  @ApiProperty({
    example: '652e4b715f2241446d3218ba',
    description: '고양이 pk',
  })
  id: string;
}
