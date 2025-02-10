import express from "express";
import { signIn,loginUser, logoutUser } from "../controllers/authController";

const router = express.Router();


router.post("/sign-in", signIn);

router.post("/log-in", loginUser);

router.post("/log-out", logoutUser);




export default router;