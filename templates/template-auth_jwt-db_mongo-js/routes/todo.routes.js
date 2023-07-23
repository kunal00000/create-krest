const express = require("express");
const {
  getAllTodos,
  createTodo,
  getTodoByID,
  updateTodoByID,
  deleteTodoByID
} = require("../controllers/todo.controllers");
const authenticate = require("../middlewares/auth.midlewares");

const router = express.Router();
router.route("/").get(getAllTodos).post(createTodo);

router
  .route("/:todoID")
  .get(getTodoByID) // Public or Unprotected route
  .put(authenticate, updateTodoByID) // Protected route
  .delete(authenticate, deleteTodoByID); // Protected route

module.exports = router;
