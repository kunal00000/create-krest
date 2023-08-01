import express from "express";

import {
  createTodo,
  deleteTodoByID,
  getAllTodos,
  getTodoByID,
  updateTodoByID
} from "../controllers/todo.controllers";
import { authenticate } from "../middlewares/auth.midlewares";

const router = express.Router();
router.route("/").get(getAllTodos).post(createTodo);

router
  .route("/:todoID")
  .get(getTodoByID) // Public/Unprotected route
  .put(authenticate, updateTodoByID) // Protected route
  .delete(authenticate, deleteTodoByID); // Protected route

export default router;
