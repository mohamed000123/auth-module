import { Router } from "express";
import { signup, signin, logout } from "../controllers/auth.controller";
import { signinSchema, signupSchema } from "../schema/user.schema";
import { protect } from "../middleware/auth.middleware";
const router = Router();
router.post("/signup", signupSchema, signup);
router.post("/signin", signinSchema, signin);
router.post("/logout", signinSchema, logout);
router.get("/check", protect, (req, res) => {
  res.status(200).json({ message: "Authenticated" });
});
export default router;
