const fs = require('fs');
const path = require('path');
const qr = require('qr-image');

import { Controller, Get, Post, Body, Query} from '@nestjs/common';
import { TablesService } from './tables.service'
import { CreateTableDto } from './dto/create-table.dto';

// 配置常量
import { constant } from '../../config/constant'
// 基础类
import { BaseController } from '../../base/base.controller'

@Controller('serve/tables')
export class TablesController extends BaseController {
    constructor(private readonly tablesService: TablesService) { super() }

    /**
     * 创建、修改桌位
     */
    @Post('editTable')
    async editTable(@Body() createtableDto: CreateTableDto) {
        // 新建逻辑
        if(!createtableDto._id) {
            // 生成二维码
            const qrCode = qr.image(createtableDto.tableNum.toString(), 'H', { type: 'png' });
            // 储存的服务器路径
            const publicPath = path.join(__dirname, '../../../');
            // 文件名
            const fileName = '/tableNum-' + createtableDto.tableNum + '.png';
            // 访问路径
            const accessPath = constant.PUBLIC_PATH + '/table' + fileName;
            // 检查路径是否存在 不存在则创建
            try {
                fs.accessSync(publicPath);
            } catch (error) {
                fs.mkdirSync(publicPath);
            }
            // 创建写入字节流 并写入硬盘
            const writeStream = fs.createWriteStream(publicPath + accessPath);
            qrCode.pipe(writeStream);
            // 默认信息
            createtableDto.status = 0;
            createtableDto.qrCode = accessPath;
            createtableDto.createTime = new Date();
        }
        const data = await this.tablesService.editTable(createtableDto);
        return this.s(data);
    }

    /**
     * 桌位列表
     */
    @Get('findTablesList')
    async findTablesList(@Query('page') page, @Query('size') size, @Query('name') name: string) {
        size = parseInt(size)
        page = parseInt(page)
        const [count, data] = await this.tablesService.findTablesList(page, size, name);
        return this.s({data, count});
    }

    /**
     * 单条桌位信息
     */
    @Get('findTable')
    async findTable(@Query('_id') _id: string) {
        const data = await this.tablesService.findTable(_id);
        return this.s(data);
    }

    /**
     * 删除桌位
     */
    @Post('delTable')
    async delTable(@Body() createtableDto: CreateTableDto) {
        const data = await this.tablesService.delTable(createtableDto);
        return this.s(data);
    }

    /**
     * 刷新桌位使用情况
     */
    @Get('reUseTable')
    async reUseTable(@Query('_id') _id: string) {
        const data = await this.tablesService.findTable(_id);
        return this.s(data.status);
    }
}
