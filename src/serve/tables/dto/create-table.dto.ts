export class CreateTableDto {
    readonly _id: string | undefined;
    readonly tableNum: number;
    readonly tableRemarks: string;
    eatingRemarks: string;
    qrCode: string;
    status: number;
    createTime: Date;
}