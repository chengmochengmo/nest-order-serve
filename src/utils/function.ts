import {ResponseData} from './response'

// 返回客户端格式
const s =  (data: any, msg = '', errorCode = 0): Object => {
    const responseData: ResponseData = {
        errorCode,
        msg,
        data
    }
    return responseData;
}

export {
    s
}