import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../../redis/cache.service'

import { s } from '../../utils/function'
import { ResponseStatus } from '../../utils/response'

// 验证是否登录
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly cache: CacheService) {}
    async use(req: Request, res: Response, next: NextFunction) {
        if(req.baseUrl == '/users/login') return next();
        const token: string = req.headers.token as string || '';
        const user = await this.cache.get(token);
        if(!user) return res.send(s(null, '请登录', ResponseStatus.LOGIN));
        next();
    }
}