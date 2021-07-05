import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { MongooseModule } from '@nestjs/mongoose';
import { AdminUsers, AdminUsersSchema } from '../../schemas/adminUsers.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: AdminUsers.name, schema: AdminUsersSchema }])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
