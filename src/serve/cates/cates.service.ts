import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cates, CatesDocument } from '../../schemas/cates.schema';
import { CreateCateDto } from './dto/create-cate.dto';

@Injectable()
export class CatesService {
    constructor(@InjectModel('Cates') private catesModel: Model<CatesDocument>) {}

    /**
     * 创建、修改分类
     */
    async editCate(createcateDto: CreateCateDto): Promise<Cates> {
        if(createcateDto._id) return this.catesModel.findByIdAndUpdate(createcateDto._id, Object.assign(createcateDto))
        return this.catesModel.create(createcateDto);
    }

    /**
     * 分类列表
     */
    async findCatesList(page: number = 1, size: number = 0, name: string): Promise<[number, Cates[]]> {
        // 模糊匹配正则
        const regexp: RegExp = new RegExp(name);
        // 查询条件
        const query: object = name ? { name: regexp } : {};
        return Promise.all([
            // 条件筛选后可查询总条数
            this.catesModel.count(query),
            // 条件筛选后 当前分页数据
            this.catesModel
                .find(query)
                // 转int类型排序
                .collation({'locale': 'zh', numericOrdering: true})
                .sort({'sort': -1})
                .skip((page -1) * size)
                .limit(size === 0 ? 999 : size)
                .exec()
        ]);
    }

    /**
     * 单条分类信息
     */
    async findCate(_id: string): Promise<Cates> {
        return this.catesModel.findById(_id);
    }

    /**
     * 删除分类
     */
    async delCate(createcateDto: CreateCateDto): Promise<Cates> {
        return this.catesModel.findByIdAndRemove(createcateDto._id);
    }

}
