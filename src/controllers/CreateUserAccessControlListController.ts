import { Request, Response } from "express";
import { CreateUserAccessControlListService } from "../services/CreateUserAccessControlListService";

class CreateUserAccessControlListController {
    async handle(request: Request, response: Response) {
        const {userId, roles, permissions} = request.body;

        const createUserAccessControlListService = new CreateUserAccessControlListService();
        
        const result = await createUserAccessControlListService.execute({userId, roles, permissions})

        response.status(201).json(result);
    }
}

export { CreateUserAccessControlListController }