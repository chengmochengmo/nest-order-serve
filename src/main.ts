const path = require('path');

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

// 配置常量
import { constant } from './config/constant'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 解除跨域
  app.enableCors();
  // 静态资源服务
  app.useStaticAssets(path.join(__dirname, '..', constant.PUBLIC_PATH), {
    // 虚拟路径 http://localhost:3000/public/xxx
    prefix: '/public/'
  });
  await app.listen(3000);
}
bootstrap();
