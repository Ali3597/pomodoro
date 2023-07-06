import { Router } from "express";
import  auth from "./auth.routes";
import task from "./task.routes"
import user from "./user.routes"

const router = Router()



router.use("/api/auth", auth);
router.use("/api/task", task);
router.use("/api/user", user);
export default router;