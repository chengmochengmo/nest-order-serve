import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// 用户
import { AdminUsers, AdminUsersDocument } from '../../schemas/adminUsers.schema';
import { CreateUserDto } from './dto/create-user.dto';
// 菜单
import { Menu, MenuDocument } from '../../schemas/menu.schema';
import { CreateMenuDto } from './dto/create-menu.dto';
// 角色
import { Role, RoleDocument } from '../../schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel('AdminUsers') private adminUsersModel: Model<AdminUsersDocument>,
		@InjectModel('Menu') private menuModel: Model<MenuDocument>,
		@InjectModel('Role') private roleModel: Model<RoleDocument>
	) { }
	/**
     * 账号列表
     */
	async findUsersList(): Promise<AdminUsers[]> {
		return this.adminUsersModel.find().exec();
	}
	/**
     * 账号单条信息
     */
	async findUser(_id: string): Promise<AdminUsers> {
		return this.adminUsersModel.findById(_id).exec();
	}
	/**
     * 添加、编辑账号
     */
	async editUser(createuserDto: CreateUserDto): Promise<AdminUsers> {
		if (createuserDto._id) return this.adminUsersModel.findByIdAndUpdate(createuserDto._id, Object.assign(createuserDto));
		return this.adminUsersModel.create(createuserDto);
	}
	/**
     * 删除账号
     */
	async delUser(createuserDto: CreateUserDto): Promise<AdminUsers> {
		return this.adminUsersModel.findByIdAndRemove(createuserDto._id);
	}
	/**
     * 登录 
     */
	async login(createuserDto: CreateUserDto): Promise<AdminUsers> {
		return this.adminUsersModel.findOne({userName: createuserDto.userName});
	}
	/**
     * 上传菜单 
     */
	 async uploadMenu(createMenuDto: CreateMenuDto): Promise<Menu> | null {
		// 如果已经存过 不在存
		const currentMenu = await this.menuModel.findOne({menuId: createMenuDto.menu.id});
		if (currentMenu) return null;
		return this.menuModel.create({
			...createMenuDto,
			menuId: createMenuDto.menu.id
		});
	}
	/**
     * 获取菜单 角色id
     */
	 async findMenuList(role: string | null): Promise<Menu[]> {
		if (!role) return this.menuModel.find().sort({ menuId: 1 });
	}
	/**
     * 创建、编辑角色 
     */
	 async editRole(createRoleDto: CreateRoleDto): Promise<Role> {
		return this.roleModel.create(createRoleDto);
	}

}
