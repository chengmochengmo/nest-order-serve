import { Controller, Get, Post, Body, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FoodsService } from './foods.service'
import { CreateFoodDto } from './dto/create-food.dto';

// 基础类
import { BaseController } from '../../base/base.controller'

@Controller('serve/foods')
export class FoodsController extends BaseController {
    constructor(private readonly foodsService: FoodsService) { super() }

    /**
     * 删除菜品
     */
    @Post('delFood')
    async delFood(@Body() createfoodDto: CreateFoodDto) {
        const data = await this.foodsService.delFood(createfoodDto);
        return this.s(data);
    }

    /**
     * 菜品列表
     */
    @Get('findFoodsList')
    async findFoodsList(@Query('page') page, @Query('size') size, @Query('name') name: string) {
        size = parseInt(size)
        page = parseInt(page)
        const [count, data] = await this.foodsService.findFoodsList(page, size, name);
        return this.s({data, count});
    }

    /**
     * 单条菜品数据
     */
    @Get('findFood')
    async findFood(@Query('_id') _id: string) {
        const data = await this.foodsService.findFood(_id);
        return this.s(data);
    }

    /**
     * 创建、编辑菜品
     */
    @Post('editFood')
    async editFood(@Body() createfoodDto: CreateFoodDto) {
        createfoodDto.createTime = new Date();
        const data = await this.foodsService.editFood(createfoodDto);
        return this.s(data);
    }

    /**
     * 上架菜品
     */
    @Post('putOnFood')
    async putOnFood(@Body() createfoodDto: CreateFoodDto) {
        const data = await this.foodsService.putOnFood(createfoodDto._id);
        const msg: string = data.isPutonShelves ? '下架成功' : '上架成功';
        return this.s(data, msg);
    }

}
