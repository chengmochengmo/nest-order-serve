export class CreateFoodDto {
    readonly _id: string | undefined;
    readonly cateId: string;
    readonly name: string;
    readonly desc: string;
    readonly pic: string;
    readonly price: number;
    readonly sort: number;
    readonly discount: number;
    readonly isPutonShelves: boolean;
    createTime: Date;
}