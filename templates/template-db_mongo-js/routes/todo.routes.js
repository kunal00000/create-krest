const express = require("express");
const {
  getAllTodos,
  createTodo,
  getTodoByID,
  updateTodoByID,
  deleteTodoByID
} = require("../controllers/todo.controllers");

const router = express.Router();
router.route("/").get(getAllTodos).post(createTodo);

router
  .route("/:todoID")
  .get(getTodoByID)
  .put(updateTodoByID)
  .delete(deleteTodoByID);

// * The above code is equivalent to the following code
// router.get('/', getAllTodos);
// router.get('/:todoID', getTodoById);
// router.post('/', createTodo);
// router.put('/:todoID', updateTodoByID);
// router.delete('/:todoID', deleteTodoByID);

module.exports = router;
