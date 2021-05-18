import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto';

import { s } from '../../utils/function'


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    /**
     * 账号列表
     */
    @Get('findUsersList')
    async findUsersList(): Promise<object> {
        const data = await this.usersService.findUsersList();
        return s(data);
    }
    /**
     * 账号单条记录
     */
    @Get('findUser')
    async findUser(@Query('_id') _id): Promise<object> {
        const data = await this.usersService.findUser(_id);
        return s(data);
    }
    /**
     * 添加、编辑账号
     */
    @Post('editUser')
    async reg(@Body() createUserDto: CreateUserDto): Promise<object> {
        const msg:string = createUserDto._id ? '编辑成功' : '创建成功';
        createUserDto.createTime = new Date();
        const data = await this.usersService.editUser(createUserDto);
        return s(createUserDto, msg);
    }
}
