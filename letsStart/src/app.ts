import * as express from "express";

const app: express.Express = express();
// express.Application 로도 사용 가능
const port: number = 8000;

//app.get("/" => 라우터
app.get("/", (req: express.Request, res: express.Response) => {
  console.log(req);
  res.send({ name: "Hugo!", age: 56, friends: [1, 2, 3, 5] });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
