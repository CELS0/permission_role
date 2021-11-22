import { Request, Response } from "express";
import { CreateRolePermissionService } from "../services/CreateRolePermissionService";

class CreateRolePermissionController {
    async handle(request: Request, response: Response) {
        const { roleId } = request.params;
        const { permissions } = request.body;

        const createRolePermissionService = new CreateRolePermissionService();

        const result = await createRolePermissionService.execute(roleId, permissions);

        response.status(200).json(result);
    }
}

export { CreateRolePermissionController }