const crypto = require('crypto');

import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto';
import { CacheService } from '../../redis/cache.service'

// 工具方法
import { s } from '../../utils/function'
import { ResponseStatus } from '../../utils/response'

@Controller('serve/users')
export class UsersController {
    constructor(private readonly usersService: UsersService, private readonly cache: CacheService) {}
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
    async editUser(@Body() createUserDto: CreateUserDto): Promise<object> {
        const msg: string = createUserDto._id ? '编辑成功' : '创建成功';
        createUserDto.createTime = new Date();
        const data = await this.usersService.editUser(createUserDto);
        return s(createUserDto, msg);
    }

    /**
     * 删除账号
     */
    @Post('delUser')
    async delUser(@Body() createUserDto: CreateUserDto): Promise<object> {
        const data = await this.usersService.delUser(createUserDto);
        return s(null, '删除成功');
    }

    /**
     * 登录
     */
    @Post('login')
    async login(@Body() createUserDto: CreateUserDto): Promise<object> {
        const data = await this.usersService.login(createUserDto);
        if(!data) return s(null, '账号不存在', ResponseStatus.ERROR);
        if(data.password !== createUserDto.password) return s(null, '密码不正确', ResponseStatus.ERROR);
        // 毫秒时间戳 + mongo索引 生成明文token
        const plaintextToken: string = new Date().valueOf().toString() + data._id;
        // md5加密 生成token
        const token: string = crypto.createHash('md5').update(plaintextToken).digest('hex');
        // token放入redis 时效2小时
        await this.cache.set(token, plaintextToken, 60 * 60 * 2);
        return s({...JSON.parse(JSON.stringify(data)), token}, '登录成功');
    }
}
