import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tables, TablesDocument } from '../../schemas/tables.schema';
import { CreateTableDto } from './dto/create-table.dto';

@Injectable()
export class TablesService {
    constructor(@InjectModel('Tables') private tablesModel: Model<TablesDocument>) {}

    /**
     * 创建、修改分类
     */
    async editTable(createtableDto: CreateTableDto): Promise<Tables> {
        if(createtableDto._id) return this.tablesModel.findByIdAndUpdate(createtableDto._id, Object.assign(createtableDto))
        return this.tablesModel.create(createtableDto);
    }

    /**
     * 分类列表
     */
    async findTablesList(page: number = 1, size: number = 0, name: string): Promise<[number, Tables[]]> {
        // 模糊匹配正则
        const regexp: RegExp = new RegExp(name);
        // 查询条件
        const query: object = name ? { name: regexp } : {};
        return Promise.all([
            // 条件筛选后可查询总条数
            this.tablesModel.count(query),
            // 条件筛选后 当前分页数据
            this.tablesModel
                .find(query)
                // 转int类型排序
                .collation({'locale': 'zh', numericOrdering: true})
                .sort({'tableNum': 1})
                .skip((page -1) * size)
                .limit(size === 0 ? 999 : size)
                .exec()
        ]);
    }

    /**
     * 单条分类信息
     */
    async findTable(_id: string): Promise<Tables> {
        return this.tablesModel.findById(_id);
    }

    /**
     * 删除分类
     */
    async delTable(createtableDto: CreateTableDto): Promise<Tables> {
        return this.tablesModel.findByIdAndRemove(createtableDto._id);
    }

    /**
     * 删除分类
     */
    async inputEatingRemarks(createtableDto: CreateTableDto): Promise<Tables> {
        return this.tablesModel.findByIdAndUpdate(createtableDto._id, {$set: { eatingRemarks: createtableDto.eatingRemarks }});
    }

}
