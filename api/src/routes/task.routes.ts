import { Router } from "express";
import {getMyTasks,createTask,toggleTask,updateTask,deleteTask ,getOneTask}  from "../controllers/task.controller";

const router = Router();

import  {requireAuth} from "../middleware/AuthMiddleware";
import { areyouTheTaskOwner } from "../middleware/taskMiddleware";

router.get("/", requireAuth,getMyTasks);
router.get("/:taskId", requireAuth,areyouTheTaskOwner,getOneTask);
router.post("/", requireAuth,createTask);
router.post("/toggle/:taskId", requireAuth,areyouTheTaskOwner,toggleTask);
router.post("/:taskId", requireAuth,areyouTheTaskOwner,updateTask);
router.delete("/:taskId", requireAuth,areyouTheTaskOwner,deleteTask);

export default router;


