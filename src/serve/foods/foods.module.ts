import { Module } from '@nestjs/common';
import { FoodsController } from './foods.controller'
import { FoodsService } from './foods.service'
import { MongooseModule } from '@nestjs/mongoose';
import { Foods, FoodsSchema } from '../../schemas/foods.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Foods.name, schema: FoodsSchema }])],
    controllers: [FoodsController],
    providers: [FoodsService]
})
export class FoodsModule {}
