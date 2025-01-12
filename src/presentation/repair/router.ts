import { Router } from "express";

import { RepairService } from "../services/repair.service";
import { UserService } from "../services/user.service";
import { RepairController  } from "./controller";

export class RepairRoutes {
  static get routes(): Router {
    const router = Router();    

    const userService = new UserService()
    const repairService = new RepairService(userService);
    const repairController = new RepairController(repairService);
 
    router.get("/", repairController.findAllRepairs);
    router.get("/:id", repairController.findOnerepair);
    router.delete("/", repairController.validRepair);
    router.delete("/:id", repairController.deleteRepair);
    router.patch("/", repairController.validRepair);
     router.post("/", repairController.createRepair);        
     router.post("/:id", repairController.noIdRepair); 
    router.patch("/", repairController.validRepair);
    router.patch("/:id", repairController.updateRepair);
    
    return router;
  }
}
