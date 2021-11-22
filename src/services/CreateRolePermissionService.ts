import { Role } from "../entities/Role";
import { PermissionRepository, RoleRepository } from "../repositories";

class CreateRolePermissionService {
    async execute(roleId: string, permissions: string[]): Promise<Role> {
        const repo = await RoleRepository();

        const role = await repo.findOne(roleId);

        const permissionsExists = await PermissionRepository().findByIds(permissions);

        role.permissions = permissionsExists;

        await repo.save(role);

        return role;
    }
}

export { CreateRolePermissionService };