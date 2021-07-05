import { Controller, Get, Post, Body, Query} from '@nestjs/common';
import { CatesService } from './cates.service'
import { CreateCateDto } from './dto/create-cate.dto';

// 基础类
import { BaseController } from '../../base/base.controller'

@Controller('serve/cates')
export class CatesController extends BaseController {
    constructor(private readonly catesService: CatesService) { super() }

    /**
     * 创建、修改分类
     */
    @Post('editCate')
    async editCate(@Body() createcateDto: CreateCateDto) {
        createcateDto.createTime = new Date();
        const data = await this.catesService.editCate(createcateDto);
        return this.s(data);
    }

    /**
     * 分类列表
     */
    @Get('findCatesList')
    async findCatesList(@Query('page') page, @Query('size') size, @Query('name') name: string) {
        size = parseInt(size)
        page = parseInt(page)
        const [count, data] = await this.catesService.findCatesList(page, size, name);
        return this.s({data, count});
    }

    /**
     * 单条分类信息
     */
    @Get('findCate')
    async findCate(@Query('_id') _id: string) {
        const data = await this.catesService.findCate(_id);
        return this.s(data);
    }

    /**
     * 删除分类
     */
    @Post('delCate')
    async delCate(@Body() createcateDto: CreateCateDto) {
        const data = await this.catesService.delCate(createcateDto);
        return this.s(data);
    }

}
