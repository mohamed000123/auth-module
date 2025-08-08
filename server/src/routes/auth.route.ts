import { Router } from "express";
import { signup, signin } from "../controllers/auth.controller";
import { signinSchema, signupSchema } from "../schema/user.schema";
const router = Router();
router.post("/signup", signupSchema, signup);
router.post("/signin", signinSchema, signin);

export default router;
