export class CreateCateDto {
    readonly _id: string | undefined;
    readonly sort: number;
    readonly name: string;
    readonly desc: String;
    readonly icon: string;
    createTime: Date;
}