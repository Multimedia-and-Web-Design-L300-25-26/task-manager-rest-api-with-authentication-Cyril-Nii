import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createATask, getUserTasks, deleteUserTask } from "../controllers/taskController.js"

const router = express.Router();

// Apply auth middleware
router.use(authMiddleware);

// POST /api/tasks
router.post("/", createATask);


// GET /api/tasks
router.get("/", getUserTasks);


// DELETE /api/tasks/:id
router.delete("/:id", deleteUserTask);

export default router;