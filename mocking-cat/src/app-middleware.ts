import * as express from 'express';
import { Cat, CatType } from './cats/cats.model';

const app: express.Express = express();

/*
미들웨어?
쉽게 말해, 요청과 응답 사이에서 적절한 로직을 처리해 주는 장치라고 생각하면 된다.
반복되는 코드를 줄이기 위해 미들웨어를 사용한다.
위치가 중요하다. 어디든 필요한 위치에 정확히 넣어줄 것.
특정 라우터에만 미들웨어를 적용하고 싶다면 .get을 사용하면 됨.
use는 모든 라우터에 적용됨.
라우터에 next가 붙게되면 미들웨어가 된다. (미들웨어의 역할을 수행할수 있게 된다?)
*/
app.use((req, res, next) => {
  console.log(req.rawHeaders[1]);
  console.log('로깅하는 미들웨어!');
  next(); // 다음 미들웨어로 넘어가는 함수
});

app.get('/cats/som', (req, res, next) => {
  console.log('솜의 미들웨어!');
  next(); // 다음 미들웨어로 넘어가는 함수
});

app.get('/', (req: express.Request, res: express.Response) => {
  /*
    rawHeaders: 요청쪽 정보를 담고 있는 배열
  */
  // console.log(req.rawHeaders[1]);
  res.send({ cats: Cat });
});

app.get('/cats/blue', (req: express.Request, res: express.Response) => {
  // console.log(req.rawHeaders[1]);
  res.send({ blue: Cat[0] });
});

app.get('/cats/som', (req: express.Request, res: express.Response) => {
  // console.log(req.rawHeaders[1]);
  res.send({ som: Cat[1] });
});

// 에러처리 미들웨어를 만든다면 맨 마지막에 위치시킴
app.use((req, res, next) => {
  console.log('Error!!!');
  res.send({ error: '404 Not Found' });
});

app.listen(8000, () => {
  console.log(`서버 실행중..!`);
});
