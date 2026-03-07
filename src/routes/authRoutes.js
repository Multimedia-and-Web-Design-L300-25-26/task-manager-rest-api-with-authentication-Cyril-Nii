import express from "express";
import { registerUser, userLogin } from "../controllers/authController.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", userLogin);

export default router;