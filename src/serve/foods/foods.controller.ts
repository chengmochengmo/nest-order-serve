import { Controller, Get, Post, Body, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FoodsService } from './foods.service'
import { CreateFoodDto } from './dto/create-food.dto';

// 工具方法
import { s } from '../../utils/function'
// 配置常量
import { constant } from '../../config/constant'
import { ResponseStatus } from '../../utils/response';

@Controller('serve/foods')
export class FoodsController {
    constructor(private readonly foodsService: FoodsService) {}

    /**
     * 删除菜品
     */
    @Post('delFood')
    async delFood(@Body() createfoodDto: CreateFoodDto) {
        const data = await this.foodsService.delFood(createfoodDto);
        return s(data);
    }

    /**
     * 菜品列表
     */
    @Get('findFoodsList')
    async findFoodsList(@Query('page') page, @Query('size') size, @Query('name') name: string) {
        size = parseInt(size)
        page = parseInt(page)
        const [count, data] = await this.foodsService.findFoodsList(page, size, name);
        return s({data, count});
    }

    /**
     * 单条菜品数据
     */
    @Get('findFood')
    async findFood(@Query('_id') _id: string) {
        const data = await this.foodsService.findFood(_id);
        return s(data);
    }

    /**
     * 创建、编辑菜品
     */
    @Post('editFood')
    async editFood(@Body() createfoodDto: CreateFoodDto) {
        createfoodDto.createTime = new Date();
        const data = await this.foodsService.editFood(createfoodDto);
        return s(data);
    }

    /**
     * 上架菜品
     */
    @Post('putOnFood')
    async putOnFood(@Body() createfoodDto: CreateFoodDto) {
        const data = await this.foodsService.putOnFood(createfoodDto._id);
        const msg: string = data.isPutonShelves ? '下架成功' : '上架成功';
        return s(data, msg);
    }

}
