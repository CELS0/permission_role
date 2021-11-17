import { Role } from "../entities/Role";
import { RoleRepository } from "../repositories";

type IRoleRequest = {
    name: string;
    description: string;
}

class CreateRoleService {
    async execute({ name, description }: IRoleRequest): Promise<Role | Error> {
        const repo = RoleRepository();

        if (await repo.findOne({ name })) {
            return new Error(`Role ${name} already exists`);
        }

        const role = repo.create({ name, description });
        await repo.save(role);

        return role;
    }
}

export { CreateRoleService }