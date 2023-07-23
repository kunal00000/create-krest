const express = require("express");
const {
  getAllTodos,
  postTodo,
  getTodoByID,
  updateTodoByID,
  deleteTodoByID
} = require("../controllers/todo.controllers");
const authenticate = require("../middlewares/auth.midlewares");

const router = express.Router();
router.route("/").get(getAllTodos).post(postTodo);

router
  .route("/:todoID")
  .get(getTodoByID) // Public/Unprotected route
  .put(authenticate, updateTodoByID) // Protected route
  .delete(authenticate, deleteTodoByID); // Protected route

module.exports = router;
