export class CreateRoleDto {
    readonly name: string;
    readonly menuIds: Array<string>;
    createTime: Date
}