import { Permission } from "../entities/Permission";
import { PermissionRepository } from "../repositories";

type IPermissionRequest = {
    name: string;
    description: string;
}

class CreatePermissionService {
    async execute({ name, description }: IPermissionRequest): Promise<Permission | Error> {
        const repo = PermissionRepository();

        if (await repo.findOne({ name })) {
            return new Error(`Permission ${name} already exists`);
        }

        const permission = repo.create({ name, description });
        await repo.save(permission);

        return permission;
    }
}

export { CreatePermissionService }