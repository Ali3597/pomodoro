import { Router } from "express";
import {updateUser,updatePassword}  from "../controllers/user.controller";

const router = Router();

import  {requireAuth} from "../middleware/AuthMiddleware";
import { areyouTheTaskOwner } from "../middleware/taskMiddleware";

router.post("/", requireAuth,updateUser);
router.post("/password", requireAuth,areyouTheTaskOwner,updatePassword);


export default router;


