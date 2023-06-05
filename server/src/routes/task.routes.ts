import { Router } from "express";
import {getMyTasks,createTask,toggleTask,updateTask,deleteTask }  from "../controllers/task.controller";

const router = Router();

import  {requireAuth} from "../middleware/AuthMiddleware";
import { areyouTheTaskOwner } from "../middleware/taskMiddleware";

router.post("/me", requireAuth,getMyTasks);
router.post("/new", requireAuth,createTask);
router.get("/toggle/:taskId", requireAuth,areyouTheTaskOwner,toggleTask);
router.post("/update/:taskId", requireAuth,areyouTheTaskOwner,updateTask);
router.delete("/delete/:taskId", requireAuth,areyouTheTaskOwner,deleteTask);

export default router;


