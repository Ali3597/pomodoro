import { Router } from "express";
import  auth from "./auth.routes";
import task from "./task.routes"

const router = Router()



router.use("/api/auth", auth);
router.use("/api/task", task);
export default router;