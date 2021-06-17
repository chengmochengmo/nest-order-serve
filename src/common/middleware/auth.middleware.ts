import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../../redis/cache.service'

import { ResponseStatus } from '../../utils/response'
// 基础类
import { BaseController } from '../../base/base.controller'


// 验证是否登录
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    // 基础类
    baseController

    constructor(cache: CacheService) {
        this.baseController = new BaseController(cache);
    }
    
    async use(req: Request, res: Response, next: NextFunction) {
        if(req.baseUrl.indexOf('/login') !== -1) return next();
        // 校验token
        const user = await this.baseController.auth(req);
        if(!user) return res.send(this.baseController.s(null, '请登录', ResponseStatus.LOGIN));
        next();
    }
}