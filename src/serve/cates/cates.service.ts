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
    async findCatesList(page, size, name): Promise<[number, Cates[]]> {
        page = parseInt(page) - 1;
        size = parseInt(size);
        const query: object = name ? { name } : {};
        return Promise.all([
            // 条件筛选后可查询总条数
            this.catesModel.count(query),
            // 条件筛选后 当前分页数据
            this.catesModel
                .find(query)
                // 转int类型排序
                .collation({'locale': 'zh', numericOrdering: true})
                .sort({'sort': -1})
                .skip(page * size)
                .limit(size)
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
