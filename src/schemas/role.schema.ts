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
  menuIds: string[];

  // 创建日期
  @Prop()
  createTime: Date;

}

const RoleSchema = SchemaFactory.createForClass(Role);

// 创建虚拟字段menuNames 用作menuIds（数组）去Menu表通过menuId查菜单名
RoleSchema.virtual('menuNames', {
  ref: 'Menu',
  localField: 'menuIds',
  foreignField: 'menuId',
  justOne: false
});

// 虚拟值默认不会被 toJSON()或toObject() 输出 需要手动设置
RoleSchema.set('toObject', { virtuals: true });
RoleSchema.set('toJSON', { virtuals: true });

export {
  RoleSchema
}