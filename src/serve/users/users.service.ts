import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../../schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	constructor(@InjectModel('Users') private usersModel: Model<UsersDocument>) { }
	/**
     * 账号列表
     */
	async findUsersList(): Promise<Users[]> {
		return this.usersModel.find().exec();
	}
	/**
     * 账号单条信息
     */
	async findUser(_id: string): Promise<Users> {
		return this.usersModel.findById(_id).exec();
	}
	/**
     * 添加、编辑账号
     */
	async editUser(createuserDto: CreateUserDto): Promise<Users> {
		if (createuserDto._id) return this.usersModel.findByIdAndUpdate(createuserDto._id, Object.assign(createuserDto));
		return this.usersModel.create(createuserDto);
	}
	/**
     * 删除账号
     */
	async delUser(createuserDto: CreateUserDto): Promise<Users> {
		return this.usersModel.findByIdAndRemove(createuserDto._id);
	}
	/**
     * 登录 
     */
	async login(createuserDto: CreateUserDto): Promise<Users> {
		return this.usersModel.findOne({userName: createuserDto.userName});
	}
}
