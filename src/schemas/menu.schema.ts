import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MenuDocument = Menu & Document;

@Schema()
export class Menu extends Document {

  // 菜单配置项目
  @Prop({ type: Object, required: true })
  menu: object;

  // 菜单id
  @Prop({ required: true })
  menuId: string;

}

export const MenuSchema = SchemaFactory.createForClass(Menu);
