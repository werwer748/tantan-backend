import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, HydratedDocument, SchemaOptions } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';

export type CatDocument = HydratedDocument<Cat>;

const options: SchemaOptions = {
  // collection: 'cats', // 이렇게 컬렉션 이름을 지정할 수도 있다.
  timestamps: true,
};

@Schema(options)
export class Cat extends Document {
  // 컬렉션 이름이 지정되지 않는경우 class명이 전부 소문자로 바뀌고 s가 붙어서 컬렉션이 생성된다.
  @ApiProperty({
    example: 'soju@naver.com',
    description: '이메일',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'soju',
    description: '고양이 이름',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'password',
    description: '비밀번호',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default:
      'https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
  })
  @IsString()
  imgUrl: string;

  // 버츄얼 필드에서 사용될 읽기전용 필드를 만들어준다.
  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments: Comments[];
  };

  readonly comments: Comments[];
}

const _CatSchema = SchemaFactory.createForClass(Cat);

// 현재 리턴값에 비밀번호도 포함되는데 이부분 가리기위해서 vircualField를 사용한다.
_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

// commnets 와 관계 매핑하는 부분
_CatSchema.virtual(
  'comments', // comments를 담은 키값으로 제공 됨
  {
    ref: 'comments', // 해당 스키마의 이름
    localField: '_id',
    foreignField: 'info',
  },
);
_CatSchema.set('toObject', { virtuals: true }); // papulate를 사용하기 위해서는 toObject, toJSON 옵션을 true로 해줘야한다.
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
