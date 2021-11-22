import { User } from "../entities/User";
import { PermissionRepository, RoleRepository, UserRepository } from "../repositories";

interface IUserACLRequest {
    userId: string;
    roles: string[];
    permissions: string[];
}

class CreateUserAccessControlListService {
    async execute({ userId, roles, permissions }: IUserACLRequest): Promise<User | Error> {
        const repo = UserRepository();

        const user = await repo.findOne(userId);

        if (!user) {
            return new Error(`User ${userId} does not exist`);
        }

        const permissionsExists = await PermissionRepository().findByIds(permissions);

        const rolesExists = await RoleRepository().findByIds(roles);

        user.permissions = permissionsExists;
        user.roles = rolesExists;

       await repo.save(user);

        return user;
    }
}

export { CreateUserAccessControlListService };
