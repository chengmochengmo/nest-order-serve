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
    async findCatesList(): Promise<Cates[]> {
        return this.catesModel.find().exec();
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
