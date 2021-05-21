import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatesDocument = Cates & Document;

@Schema()
export class Cates extends Document {

  // 分类名
  @Prop({ required: true })
  name: string;

  // 描述
  @Prop()
  desc: String

  // 排序
  @Prop()
  sort: String

  // icon
  @Prop({ required: true })
  icon: string;

  // 分类创建日期
  @Prop()
  createTime: Date;
}

export const CatesSchema = SchemaFactory.createForClass(Cates);
