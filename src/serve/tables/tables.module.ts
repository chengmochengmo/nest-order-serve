import { Module } from '@nestjs/common';
import { TablesController } from './tables.controller'
import { TablesService } from './tables.service'

import { MongooseModule } from '@nestjs/mongoose';
import { Tables, TablesSchema } from '../../schemas/tables.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Tables.name, schema: TablesSchema }])],
    controllers: [TablesController],
    providers: [TablesService]
})
export class TablesModule {}
