import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminUsersDocument = AdminUsers & Document;

@Schema()
export class AdminUsers extends Document {

  // 用户称呼
  @Prop({ required: true })
  name: string;

  // 账号
  @Prop({ required: true })
  userName: string;

  // 密码
  @Prop({ required: true })
  password: string;

  // 用户创建日期
  @Prop()
  createTime: Date;

  // 最后一次登录日期
  @Prop()
  lastLoginTime: Date;

  // 角色id
  @Prop()
  roleId: string;
}

export const AdminUsersSchema = SchemaFactory.createForClass(AdminUsers);
