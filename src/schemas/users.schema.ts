import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users extends Document {

  // 用户称呼
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  // 用户创建日期
  @Prop()
  createTime: Date;

  // 最后一次登录日期
  @Prop()
  lastLoginTime: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
