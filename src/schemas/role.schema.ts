import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role extends Document {

  // 角色名称
  @Prop({ required: true })
  name: string;

  // 角色可访问菜单 只存菜单id
  @Prop({ required: true })
  menuIds: Array<string>;

  // 创建日期
  @Prop()
  createTime: Date;

}

export const RoleSchema = SchemaFactory.createForClass(Role);
