import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cat } from 'src/cats/cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import { Comments } from 'src/comments/comments.schema';

/*
레포지토리 디자인 패턴?
- 서비스에서 db에 직접 접근할때 로직이 복잡해지면 서비스는 비지니스 로직에 집중하기가 어려워 진다.
- 로직 자체를 테스팅하기도 어렵고, 중복이 발생되는 코드도 많아지고, 가독성도 떨어지게 된다.
- 서비스 로직끼리 참조하여 사용하다보면 순환참조가 발생하기도 하고..(순환참조를 해결할순 있지만 가독성에 치명적이다.)

그래서 나온것이 레포지토리 패턴!
서비스와 데이터베이스 사이에 중계자를 두는 것이라고 생각하면 됨.
데이터베이스와 직접적으로 연결되는 로직들을 따로 두게 되면 서비스는 일방향적으로 레포지토리로만 접근하면 된다.
그러면 서비스는 각각의 비지니스로직에 더 집중하게 되고 모듈간의 책임분리도 확실해진다.

레포지토리 패턴의 핵심은 데이터의 출처와 관계없이(db를 여러개 두고 쓴다면..) 동일한 방식으로 데이터에 접근할 수 있도록 하는 것이다.
근데 레포지토리가 중앙에서 쿼리를 잘 다듬어주면 서비스레이어에서 어떤 데이터베이스를 사용하던지 상관없이 동일한 방식으로 데이터에 접근하여 핸들링할 수 있다.
그렇기 때문에 데이터베이스 중앙 통제실이라고 생각하면 된다는 것이다.
*/

@Injectable()
export class CatsRepository {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
  ) {}

  async findAll() {
    //? populate: 다른 도큐먼트와 이어주는 역할을 한다.
    const result = await this.catModel
      .find()
      .populate({ path: 'comments', model: this.commentsModel });
    return result;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);

    cat.imgUrl = `http://localhost:8000/media/${fileName}`;

    const newCat = await cat.save();

    console.log(newCat);
    return newCat.readOnlyData;
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    //? .select('-password'): password를 제외한 나머지 필드를 가져온다. (email name)으로 쓰면 email과 name만 가져옴
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email });
      return result ? true : false;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
