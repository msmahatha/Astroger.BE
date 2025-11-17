import express from "express";
import { completeProfile, getUser, googleLogin, logIn, logOut, signUp } from "../controllers/authController.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/signup",signUp);
router.post("/login",logIn);
router.post("/logout",logOut);
router.get("/get-user",protectRoute,getUser)
router.post('/google', googleLogin);
router.post('/complete-profile', protectRoute, completeProfile);

export default router;