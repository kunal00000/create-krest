const express = require("express");
const {
  getAllTodos,
  postTodo,
  getTodoByID,
  updateTodoByID,
  deleteTodoByID
} = require("../controllers/todo.controllers");

const router = express.Router();
router.route("/").get(getAllTodos).post(postTodo);

router
  .route("/:todoID")
  .get(getTodoByID)
  .put(updateTodoByID)
  .delete(deleteTodoByID);

module.exports = router;
