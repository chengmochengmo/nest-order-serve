import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Foods, FoodsDocument } from '../../schemas/foods.schema';
import { CreateFoodDto } from './dto/create-food.dto';

@Injectable()
export class FoodsService {
    constructor(@InjectModel('Foods') private foodsModel: Model<FoodsDocument>) {}

    /**
     * 删除菜品
     */
    async delFood(createfoodDto: CreateFoodDto): Promise<Foods> {
        return this.foodsModel.findByIdAndRemove(createfoodDto._id);
    }

    /**
     * 菜品列表
     */
    async findFoodsList(page: number = 1, size: number = 0, name: string): Promise<[number, Foods[]]> {
        // 模糊匹配正则
        const regexp: RegExp = new RegExp(name);
        // 查询条件
        const query: object = name ? { name: regexp } : {};
        return Promise.all([
            // 条件筛选后可查询总条数
            this.foodsModel.count(query),
            // 条件筛选后 当前分页数据
            this.foodsModel
                .find(query)
                // 多表查询 分类
                .populate({
                    path: 'cateId',
                    model: 'Cates'
                })
                // 转int类型排序
                .collation({'locale': 'zh', numericOrdering: true})
                .sort({'sort': -1})
                .skip((page -1) * size)
                .limit(size === 0 ? 999 : size)
                .exec()
        ]);
    }

    /**
     * 单条菜品数据
     */
    async findFood(_id: string): Promise<Foods> {
        return this.foodsModel.findById(_id);
    }

    /**
     * 创建、编辑菜品
     */
    async editFood(createfoodDto: CreateFoodDto): Promise<Foods> {
        if(createfoodDto._id) return this.foodsModel.findByIdAndUpdate(createfoodDto._id, Object.assign(createfoodDto))
        return this.foodsModel.create(createfoodDto);
    }

    /**
     * 上架菜品
     */
    async putOnFood(_id: string): Promise<Foods> {
        const data = await this.findFood(_id);
        data.isPutonShelves = !data.isPutonShelves;
        return this.foodsModel.findByIdAndUpdate(_id, Object.assign(data));
    }

}
