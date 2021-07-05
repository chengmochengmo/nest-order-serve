export class CreateUserDto {
    readonly _id: string | undefined;
    readonly userName: string;
    readonly password: string;
    readonly name: string;
    createTime: Date;
    lastLoginTime: Date;
}