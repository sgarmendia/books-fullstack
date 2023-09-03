import { Router } from "express";
import {
	getRegisteredUsers,
	userSignup,
	userLogin,
} from "../controllers/users";

const router = Router();

router.get("/users", getRegisteredUsers);
router.post("/signup", userSignup);
router.post("/login", userLogin);

export default router;
