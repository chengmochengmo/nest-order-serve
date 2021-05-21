import { Module } from '@nestjs/common';
import { CatesController } from './cates.controller'
import { CatesService } from './cates.service'

import { MongooseModule } from '@nestjs/mongoose';
import { Cates, CatesSchema } from '../../schemas/cates.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Cates.name, schema: CatesSchema }])],
    controllers: [CatesController],
    providers: [CatesService]
})
export class CatesModule {}
