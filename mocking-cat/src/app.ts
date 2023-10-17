/* Create Read */
import * as express from 'express';
import catsRouter from './cats/cats.route';

/**
 * 싱글톤 패턴을 적용할 것이다.
 * 싱글톤 패턴이란? 객체의 인스턴스가 하나만 생성되는 것을 보장하는 패턴
 * 사용하는 이유? 메모리 낭비를 방지하기 위해
 */
/**
 * 강사의 글을 인용
강의에서 Server라는 클래스는 하나의 인스턴스를 만들었습니다. 

그리고 이 인스턴스는 고유하는 것을 보증 받습니다. 

이 인스턴스는 프로그램에서 한 번만 사용되어야 하기 때문입니다. 

애초에 여러 서버를 여는 것이 아니라는 것이 확실하기에 서버 인스턴스는 하나만 필요합니다. 

이 경우, 다수의 Server 인스턴스를 찍어서 사용 하는 것은 복잡함을 야기하고 불필요합니다.

하나의 인스턴스만을 찍어내고 사용하는 것, 이것이 싱글톤 패턴입니다.

Node.js에서 모듈 캐싱으로 싱글톤 패턴에 의미가 없다는 것은

예를들어 import * as express from "express"; 이 문장을 여러번 찍어도 캐싱이 되기 때문에 모듈을 import 하는 관점에서는 의미가 없다는 것입니다.

싱글톤 패턴은 소프트웨어 코드 작성에 있어 의미가 있습니다. 

설령 메모리 효율에 있어서 장점이 없다 해도, 코드 디자인 측면에서 장점이 있다면 의미가 있습니다.

추가적으로 싱글톤 패턴이 항상 좋은 것은 아닙니다. 잘못 적용하면 SOLID 원칙에 위배 될 수 있습니다. 

이로 인해 어떤 관점에서는 안티 패턴이 될 수 있습니다.

아주 분명한 경우에 적용하는 것이 맞습니다. 서버 실행과 같이 딱 한 번 사용됨을 보증 받아야 하는 경우가 바로 그것이죠. 

그리고 대체적으로 프레임워크의 도움을 받는 것이 좋습니다. 뒤에 NestJS에서는 컨트롤러, 서비스 등 레이어가 딱 한 번 인스턴스를 만들어 사용되는 것을 보증받도록 만들어져 있습니다
 */
class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.use(catsRouter);
  }

  private setMiddleware() {
    //* 로깅 미들웨어
    this.app.use((req, res, next) => {
      console.log(req.rawHeaders[1]);
      console.log('로깅하는 미들웨어!');
      next();
    });

    //* json middleware
    //? express.json(): express에서 제공하는 middleware
    this.app.use(express.json());

    this.setRoute();

    //* 404 미들웨어
    this.app.use((req, res, next) => {
      console.log('Error!!!');
      res.send({ error: '404 Not Found' });
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(8000, () => {
      console.log(`서버 실행중..!`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();

/**
 //? 싱글톤 패턴 구성 전
const app: express.Express = express();


//* 로깅 미들웨어
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log('로깅하는 미들웨어!');
  next();
});

//* json middleware
//? express.json(): express에서 제공하는 middleware
app.use(express.json());

app.use(catsRouter);

//* 404 미들웨어
app.use((req, res, next) => {
  console.log('Error!!!');
  res.send({ error: '404 Not Found' });
});

app.listen(8000, () => {
    console.log(`서버 실행중..!`);
});
*/
