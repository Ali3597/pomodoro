import { Router } from "express";
import {getMyTasks,createTask,toggleTask,updateTask,deleteTask }  from "../controllers/task.controller";

const router = Router();

import  {requireAuth} from "../middleware/AuthMiddleware";

router.post("/me", requireAuth,getMyTasks);
router.post("/new", requireAuth,createTask);
router.get("/toggle/:taskId", requireAuth,toggleTask);
router.post("/update/:taskId", requireAuth,updateTask);
router.delete("/delete/:taskId", requireAuth,deleteTask);

export default router;


