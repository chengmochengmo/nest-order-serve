import { Module, Global, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 用户
import { UsersModule } from './serve/users/users.module';
// 分类
import { CatesModule } from './serve/cates/cates.module';


// mongo数据库
import { MongooseModule } from '@nestjs/mongoose';

// redis数据库
import { RedisModule} from 'nestjs-redis'
const options = {
  port: 6379,
  host: '127.0.0.1',
  password: '',
  db: 0
}

// redis服务
import { CacheService } from './redis/cache.service';
// anth中间件
import { AuthMiddleware } from './common/middleware/auth.middleware'

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestOrder'),
    RedisModule.register(options),
    UsersModule,
    CatesModule
  ],
  controllers: [AppController],
  providers: [AppService, CacheService],
  exports: [CacheService]
})

export class AppModule {
  // 全局注册anth中间件
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/serve/*')
  }
}
