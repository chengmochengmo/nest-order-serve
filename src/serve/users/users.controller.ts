import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { CacheService } from '../../redis/cache.service'

// 工具方法
import { ResponseStatus } from '../../utils/response'
// 基础类
import { BaseController } from '../../base/base.controller'

@Controller('serve/users')
export class UsersController extends BaseController {
    constructor(private readonly usersService: UsersService, cache: CacheService) { super(cache) }
    /**
     * 账号列表
     */
    @Get('findUsersList')
    async findUsersList(): Promise<object> {
        const data = await this.usersService.findUsersList();
        return this.s(data);
    }
    /**
     * 账号单条记录
     */
    @Get('findUser')
    async findUser(@Query('_id') _id): Promise<object> {
        const data = await this.usersService.findUser(_id);
        return this.s(data);
    }
    /**
     * 添加、编辑账号
     */
    @Post('editUser')
    async editUser(@Body() createUserDto: CreateUserDto): Promise<object> {
        const msg: string = createUserDto._id ? '编辑成功' : '创建成功';
        createUserDto.createTime = new Date();
        const data = await this.usersService.editUser(createUserDto);
        return this.s(createUserDto, msg);
    }

    /**
     * 删除账号
     */
    @Post('delUser')
    async delUser(@Body() createUserDto: CreateUserDto): Promise<object> {
        const data = await this.usersService.delUser(createUserDto);
        return this.s(null, '删除成功');
    }

    /**
     * 登录
     */
    @Post('login')
    async login(@Body() createUserDto: CreateUserDto): Promise<object> {
        const data = await this.usersService.login(createUserDto);
        if (!data) return this.s(null, '账号不存在', ResponseStatus.ERROR);
        if (data.password !== createUserDto.password) return this.s(null, '密码不正确', ResponseStatus.ERROR);
        // 生成token
        const token = await this.regToken(data, 'serve');
        return this.s({...JSON.parse(JSON.stringify(data)), token}, '登录成功');
    }

    /**
     * 菜单上传
     */
     @Post('uploadMenu')
     async uploadMenu(@Body() createMenuDto: CreateMenuDto): Promise<object> {
        const data = await this.usersService.uploadMenu(createMenuDto);
        if (data) return this.s(null, '上传成功');
        return this.s(null, '此菜单已经存在', ResponseStatus.ERROR);
    }

    /**
     * 菜单获取
     */
     @Get('findMenuList')
     async findMenuList(@Query('role') role): Promise<object> {
        const data = await this.usersService.findMenuList(role);
        return this.s(data.map(item => item.menu));
    }
}
