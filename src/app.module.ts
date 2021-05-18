import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// mongo数据库
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './serve/users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nestOrder'), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
