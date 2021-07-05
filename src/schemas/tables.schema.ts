import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TablesDocument = Tables & Document;

@Schema()
export class Tables extends Document {

  // 桌位号
  @Prop({ required: true })
  tableNum: number;

  // 桌位二维码
  @Prop({ required: true })
  qrCode: string;

  // 桌位备注信息
  @Prop()
  tableRemarks: string;

  // 就餐备注信息
  @Prop()
  eatingRemarks: string;

  // 使用情况 0-空闲 1-就餐中 2-清理中
  @Prop()
  status: number;

  // 桌位创建日期
  @Prop()
  createTime: Date;
}

export const TablesSchema = SchemaFactory.createForClass(Tables);
