export class CreateRoleDto {
    readonly _id: string | undefined;
    readonly name: string;
    readonly menuIds: string;
    createTime: Date
}