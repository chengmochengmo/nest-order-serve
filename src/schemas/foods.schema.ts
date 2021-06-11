import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FoodsDocument = Foods & Document;

@Schema()
export class Foods extends Document {

    // 所属分类id
    @Prop({ required: true})
    cateId: string;

    // 菜品名
    @Prop({ required: true })
    name: string;

    // 菜品图
    @Prop({ required: true })
    pic: string;

    // 菜品描述
    @Prop()
    desc: string;

    // 菜品价格
    @Prop({ required: true })
    price: number;

    // 排序
    @Prop()
    sort: number

    // 折扣
    @Prop()
    discount: number;

    // 是否上架
    @Prop()
    isPutonShelves: boolean;

    // 分类创建日期
    @Prop()
    createTime: Date;

}

export const FoodsSchema = SchemaFactory.createForClass(Foods);
