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
		return this.adminUsersModel
			.find()
			// 多表查询 角色id
			.populate({
				path: 'roleId',
				model: 'Role'
			})
			.exec();
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
	async editUser(createuserDto: CreateUserDto): Promise<AdminUsers> | null {
		if (createuserDto._id) return this.adminUsersModel.findByIdAndUpdate(createuserDto._id, Object.assign(createuserDto));
		// 查看是否有占用
		const currentUser = await this.adminUsersModel.findOne({
			$or: [
				{userName: createuserDto.userName},
				{name: createuserDto.name}
			  ]
		}).exec();
		if (currentUser) return null;
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
		return this.adminUsersModel.findOne({ userName: createuserDto.userName }).exec();
	}
	/**
	 * 菜单上传 
	 */
	async uploadMenu(createMenuDto: CreateMenuDto): Promise<Menu> {
		// 如果已经存过 不再存
		const currentMenu = await this.menuModel.findOne({ menuId: createMenuDto.menu.id }).exec();
		if (currentMenu) return null;
		return this.menuModel.create({
			...createMenuDto,
			menuId: createMenuDto.menu.id
		});
	}
	/**
	 * 菜单获取 所有
	 */
	async findMenuList({ page = 1, size = 0, name, auth }: any): Promise<[number, Menu[]]> {
		// 模糊匹配正则
		const regexpName: RegExp = new RegExp(name);
		const regexpAuth: RegExp = new RegExp(auth);
		// 查询条件
		const query: object = { 'menu.name': regexpName, 'menu.auth': regexpAuth };
		return Promise.all([
			// 条件筛选后可查询总条数
			this.menuModel.countDocuments(query),
			// 条件筛选后 当前分页数据
			this.menuModel
				.find(query)
				.sort({ 'menuId': 1 })
				.skip((page - 1) * size)
				.limit(size === 0 ? 999 : parseInt(size as string))
				.exec()
		]);
	}
	/**
	 * 菜单获取 角色id判断可访问菜单
	 */
	 async findMenuListByrole({ role }: any): Promise<Menu[]> {
		// 找到角色
		const accessRole = await this.roleModel.findOne({_id: role});
		if (accessRole) {
			// 角色可访问菜单
			const accessMenuIds = accessRole.menuIds;
			const regexpRoleId: RegExp = new RegExp(accessMenuIds.map(item => `^${item}$`).join('|'));
			return this.menuModel
				.find({menuId: regexpRoleId})
				.sort({ 'menuId': 1 })
				.exec()
		}
		return null;
	}
	/**
	 * 创建、编辑角色 
	 */
	async editRole(createRoleDto: CreateRoleDto): Promise<Role> {
		if (createRoleDto._id) return this.roleModel.findByIdAndUpdate(createRoleDto._id, Object.assign(createRoleDto));
		const currentRole = await this.roleModel.findOne({name: createRoleDto.name}).exec();
		if (currentRole) return null;
		return this.roleModel.create(createRoleDto);
	}
	/**
	 * 获取角色列表 
	 */
	async findRoleList(): Promise<Role[]> {
		return this.roleModel
			.find()
			// 用menuId去Menu表查menuName
			.populate({
				path: 'menuNames',
				select: 'menu.name -_id',
				model: 'Menu'
			})
			.exec();
	}
	/**
	 * 删除角色
	 */
	async delRole(createRoleDto: CreateRoleDto): Promise<Role> {
		return this.roleModel.findByIdAndRemove(createRoleDto._id);
	}
	/**
	 * 账号绑定角色
	 */
	async userBindRole(userId: string, roleId: string): Promise<object> {
		return this.adminUsersModel.updateOne({_id: userId}, { $set: { roleId }});
	}

}
