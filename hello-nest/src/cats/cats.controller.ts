import {
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from 'src/cats/cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { PositiveIntPipe } from '../pipes/positiveint.pipe';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter) // 컨트롤러 전체에 적용 시킬수도 있다.
export class CatsController {
  //* 이렇게하면 DI 를 한 것이다. (여기서만 쓰니까 private readonly 로...)
  constructor(private readonly catService: CatsService) {}

  @Get() // GET /cats
  //? UseFilters로 에러 사용방법 1.
  // @UseFilters(HttpExceptionFilter) // UseFilters로 해당 컨트롤러에서만 적용된다.
  // getAllCat() {
  //   // throw new HttpException('api is broken', 401);
  //   // throw new HttpException({ success: false, message: 'api is broken' }, 401);
  //   throw new HttpException('api is broken', 401);
  //   return 'all cat';
  // }
  getAllCat() {
    // throw new HttpException('api is broken', 401);
    console.log('hello controller');
    return { cats: 'all cat' };
  }

  /*
  Pipe? 파이프는 컨트롤러에서 들어오는 데이터를 원하는 형태로 가공해주는 역할을 한다.

  자세한 설명:
  파이프는 단방향 통신을 위한 용도로 사용됩니다. 
  하나의 파이프는 이전 파이프에서 전달된 결과를 입력 값으로 받아 또 다른 결과 값을 내놓습니다. 
  NestJS에서의 파이프는 클라이언트 요청에서 들어오는 데이터를 유효성 검사 및 변환을 수행하여 서버가 원하는 데이터를 얻을 수 있도록 도와주는 역할을 합니다.
  */
  @Get(':id') // GET /cats/:id
  getOneCat(@Param('id', ParseIntPipe, PositiveIntPipe) param: number) {
    // ParseIntPipe, PositiveIntPipe => 파이프를 놓듯이 주욱 이어서 쓸 수 있다.
    //* ParseIntPipe: 해당 파이프를 사용하면 자동으로 숫자로 변환해준다.
    //? @Param('id') param에서 :id 위치에 있는 값을 특정하여 가져온다.
    // console.log(param);
    return 'one cat';
  }

  @Post() // POST /cats
  createCat() {
    return 'create cat';
  }

  @Put(':id') // PUT /cats/:id
  updateCat() {
    return 'update cat';
  }

  @Patch(':id') // PATCH /cats/:id
  updatePartialCat() {
    return 'update partial cat';
  }

  @Delete(':id') // DELETE /cats/:id
  deleteCat() {
    return 'delete cat';
  }
}
