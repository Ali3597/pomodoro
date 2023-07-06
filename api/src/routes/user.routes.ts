import { Router } from "express";
import {updateUser,updatePassword}  from "../controllers/user.controller";

const router = Router();

import  {requireAuth} from "../middleware/AuthMiddleware";


router.post("/", requireAuth,updateUser);
router.post("/password", requireAuth,updatePassword);


export default router;


