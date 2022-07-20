const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

import { Controller, Post, Body, UseInterceptors, UploadedFile  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CacheService } from '../redis/cache.service'
// 配置常量
import { constant } from '../config/constant'
import { ResponseData, ResponseStatus } from '../utils/response'

@Controller('base')
export class BaseController {
    constructor(protected readonly cache?: CacheService) {}

    // 统一api返回格式
    s(data: any, msg = '', errorCode = ResponseStatus.SUCCESS): Object {
        const responseData: ResponseData = {
            errorCode,
            msg,
            data
        }
        return responseData;
    }

    // 文件上传
    upload(file, folder): Promise<any> {
        return new Promise ((resolve, reject) => {
            // 文件储存公共路径
            const publicPath = path.join(__dirname, `../../${constant.PUBLIC_PATH}/${folder}`);
            console.log(publicPath)
            // 检查路径是否存在 不存在则创建
            try {
                fs.accessSync(publicPath);
            } catch (error) {
                fs.mkdirSync(publicPath);
            }
            // 服务端储存的文件名字
            const fileName: string = new Date().valueOf().toString() + file.originalname;
            // 写入硬盘
            fs.writeFileSync(path.join(publicPath, fileName), file.buffer);
            resolve({
                fileName
            })
        })
    }

    /**
     * 图片上传
     */
    @Post('uploadImage')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file, @Body('folder') folder, @Body('platform') platform) {
        if(!folder) return this.s(null, '请标明文件储存路径', ResponseStatus.ERROR);
        if(!platform) return this.s(null, '请标明文件来源', ResponseStatus.ERROR);
        const data = await this.upload(file, folder);
        return this.s({
            filePath: `${constant.PUBLIC_PATH}/${folder}/${data.fileName}`,
            size: file.size,
            mimetype: file.mimetype
        })
    }

    // 生成token
    regToken(data, query): Promise<string> {
        return new Promise(async (resolve, reject) => {
            // 毫秒时间戳 + mongo索引 生成明文token
            const plaintextToken: string = new Date().valueOf().toString() + query + data._id;
            // md5加密 生成token
            const token: string = crypto.createHash('md5').update(plaintextToken).digest('hex');
            // token放入redis 时效2小时
            await this.cache.set(token, plaintextToken, 60 * 60 * 2);
            resolve(token);
        })
    }

    // 身份鉴权
    auth(req): Promise<string> {
        return new Promise(async (resolve, reject) => {
            const token: string = req.headers.token as string || '';
            const user = await this.cache.get(token);
            resolve(user);
        })
    }
}