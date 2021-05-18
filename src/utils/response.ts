// 和客户端约定状态码
enum ResponseStatus {
    SUCCESS = 0,
    ERROR = 1,
    LOGIN = 401
}

// 数据响应格式
interface ResponseData {
    errorCode: number,
    msg: string,
    data: any
}

export {
    ResponseStatus,
    ResponseData
}