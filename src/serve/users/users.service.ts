import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AdminUsers, AdminUsersDocument } from '../../schemas/adminUsers.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	constructor(@InjectModel('AdminUsers') private adminUsersModel: Model<AdminUsersDocument>) { }
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
}
