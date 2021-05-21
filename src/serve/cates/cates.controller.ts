const fs = require('fs');
const path = require('path');

import { Controller, Get, Post, Body, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CatesService } from './cates.service'
import { CreateCateDto } from './dto/create-cate.dto';

// 工具方法
import { s } from '../../utils/function'
// 配置常量
import { constant } from '../../config/constant'

@Controller('serve/cates')
export class CatesController {
    constructor(private readonly catesService: CatesService) {}

    /**
     * 创建、修改分类
     */
    @Post('editCate')
    async editCate(@Body() createcateDto: CreateCateDto) {
        const data = await this.catesService.editCate(createcateDto);
        return s(data);
    }

    /**
     * 分类列表
     */
    @Get('findCatesList')
    async findCatesList() {
        const data = await this.catesService.findCatesList();
        return s(data);
    }

    /**
     * 单条分类信息
     */
    @Get('findCate')
    async findCate(@Query('_id') _id: string) {
        const data = await this.catesService.findCate(_id);
        return s(data);
    }

    /**
     * 删除分类
     */
    @Post('delCate')
    async delCate(@Body() createcateDto: CreateCateDto) {
        const data = await this.catesService.delCate(createcateDto);
        return s(data);
    }

    /**
     * 图片上传
     */
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file) {
        // 服务端文件名字
        const fileName: string = new Date().valueOf().toString() + file.originalname;
        // 写入硬盘
        const writerStream = fs.writeFileSync(path.join(__dirname, `../../../${constant.PUBLIC_PATH}`, fileName), file.buffer);
        return s({
            filePath: `${constant.PUBLIC_PATH}/${fileName}`,
            size: file.size,
            mimetype: file.mimetype
        })
    }
}
