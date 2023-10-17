import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { CatsService } from './cats/cats.service';

/*
  객체지향 프로그래밍의 핵심 목표? 실생활과 유사하게 코드를 짠다.
*/

// @Controller('cats') // /cats
@Controller()
export class AppController {
  /*
  express에서는 서비스 파일에서 바로 함수를 불러와서 사용했지만 nest에서는 서비스를 불러와서 생성자에 주입해 초기화 후 사용함.
  보통 클래스를 생각하면 생성자에서 받고 초기화할때
  constructor(private readonly appService: AppService) {
    this.appService = appService;
  }
  이런식으로 사용하는데 nest에서는 이런식으로 사용하지 않고 바로 appService를 사용할 수 있음.
  이것을 의존성 주입 패턴이라고 함. (DI Dependency Injection)

  앱 서비스는 제품 공급자(Provider)이고 컨트롤러는 사용자라고 생각했을때 this.appService는 제품을 사용하는 거라고
  생각하면 이해하기 쉬움.
  이 때 app.module.ts 의 providers에 AppService가 등록되어 있기 때문에 제품을 사용할 수 있게 되는것
  그러니까 사업자등록이 되어있으면(providers에 AppService가 등록) AppService의 제품을 사용할 수 있게 되는 것이다.

  그래서 대부분의 공급자 취급될수 있는 모듈들(서비스, 컨트롤러, 미들웨어 등등)은 @Injectable() 이라는 데코레이터를 보증서로 가지고 있어야 함.
  이게 전반적인 DI의 원리이다.
  공급자에게 생성자를 주입받아서 사용하는 것
  */
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService,
  ) {}

  /*
  //* @: 데코레이터라는 패턴 => 함수나 클래스에 기능 첨가를 해줘서 기능을 극대화 시켜주는 것.
  @Get('hello/:id') // GET /cats/hello
  getHello(
    @Req() req: Request,
    @Body() body, // body같은 경우는 DTO를 사용하는 것이 좋음. vaildation에도 유용 함
    @Param() param: { id: string; name: string },
  ): string {
    console.log(req);
    console.log(param);

    ? 컨트롤러와 서비스를 굳이 나눠서 사용하는 이유는 유지 보수, 디자인패턴, 테스트 등등의 이유가 있음.
    return this.appService.getHello();
  }
  */
  @Get()
  getHello(): string {
    // return this.appService.getHello();
    return this.catsService.hiCatServiceProduct();
  }
}
