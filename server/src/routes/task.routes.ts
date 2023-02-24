import { Router } from "express";
import {getMyTasks }  from "../controllers/task.controller";

const router = Router();

import  {requireAuth} from "../middleware/AuthMiddleware";

router.get("/tasks", requireAuth,getMyTasks);

export default router;
