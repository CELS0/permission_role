import {NextFunction, Request,Response} from "express";
import { UserRepository } from "../repositories";

export function can(permissionsRoutes: string[]){
    return async (req:Request, res: Response, next: NextFunction) =>{
        const {userId} = req;

        const user = await UserRepository().findOne({
            where: {id: userId},
            relations: ['permissions'],
        });

        if(!user) {
            return res.status(400).json('User does not exists');
        }

        const permissionsExists = user.permissions
        .map((permission) => permission.name)
        .some((permission) => permissionsRoutes.includes(permission))

        if(!permissionsExists){
            return res.status(401).end();
        }

        return next();
    }
}


export function is(rolesRoutes: string[]){
    return async (req:Request, res: Response, next: NextFunction) =>{
        const {userId} = req;

        const user = await UserRepository().findOne({
            where: {id: userId},
            relations: ['roles'],
        });

        if(!user) {
            return res.status(400).json('User does not exists');
        }

        const rolesExists = user.roles
        .map((role) => role.name)
        .some((role) => rolesRoutes.includes(role))

        if(!rolesExists){
            return res.status(401).end();
        }

        return next();
    }
}