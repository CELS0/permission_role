import { Router } from "express";
import { CreatePermissionController } from "./controllers/CreatePermissionController";
import { CreateProductController } from "./controllers/CreateProductController";
import { CreateRoleController } from "./controllers/CreateRoleController";
import { CreateRolePermissionController } from "./controllers/CreateRolePermissionController";
import { CreateUserAccessControlListController } from "./controllers/CreateUserAccessControlListController";
import { CreateUserController } from "./controllers/CreateUserController";
import { GetAllProductsController } from "./controllers/GetAllProductsController";
import { SessionController } from "./controllers/SessionController";
import { ensuredAuthenticated } from "./middleware/ensuredAuthenticated";
import { can } from "./middleware/permissions";


const routes = Router();

routes.post("/users", new CreateUserController().handle);
routes.post("/login", new SessionController().handle);
routes.get("/products", new GetAllProductsController().handle);
routes.post("/roles",ensuredAuthenticated() ,new CreateRoleController().handle);
routes.post('/permission', new CreatePermissionController().handle);
routes.post('/users/acl', new CreateUserAccessControlListController().handle);
routes.post('/roles/:roleId', new CreateRolePermissionController().handle)
routes.post('/product',ensuredAuthenticated(),can(['create']), new CreateProductController().handle);


export { routes };
