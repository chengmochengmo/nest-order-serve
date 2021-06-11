export class CreateCateDto {
    readonly _id: string | undefined;
    readonly sort: number;
    readonly name: string;
    readonly desc: string;
    readonly icon: string;
    createTime: Date;
}