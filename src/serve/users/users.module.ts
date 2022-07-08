import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { MongooseModule } from '@nestjs/mongoose';
import { AdminUsers, AdminUsersSchema } from '../../schemas/adminUsers.schema';
import { Menu, MenuSchema } from '../../schemas/menu.schema';
import { Role, RoleSchema } from '../../schemas/role.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: AdminUsers.name, schema: AdminUsersSchema },
        { name: Menu.name, schema: MenuSchema },
        { name: Role.name, schema: RoleSchema }
    ])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
