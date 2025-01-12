import { Router } from "express";

import { UserService } from "../services/user.service";
import { UserController } from "./controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();   

    const userService = new UserService();
    const userController = new UserController(userService);
 
    router.get("/", userController.findAllUser);
    router.post("/:id", userController.noparamUser);
    router.post("/", userController.createUser);
    router.get("/:id", userController.findOneUser);
    router.delete("/", userController.validUser);
    router.delete("/:id", userController.deleteUser);
    router.patch("/", userController.validUser);
    router.patch("/:id", userController.updateUser);
    
    return router;
  }
}
