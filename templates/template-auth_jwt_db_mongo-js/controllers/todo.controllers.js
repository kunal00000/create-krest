const Todo = require("../models/todo.models");

const getAllTodos = async (req, res) => {
  const todos = await Todo.find({});
  return res.status(200).json({ message: "Success", data: todos });
};

const createTodo = async (req, res) => {
  const todo = req.body;
  const newTodo = new Todo(todo);
  await newTodo.save();
  return res
    .status(201)
    .json({ message: "Todo added successfully", data: newTodo });
};

const getTodoByID = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoID);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "Todo found", data: todo });
  } catch (err) {
    return res.status(404).json({ message: "Todo not found" });
  }
};

const updateTodoByID = async (req, res) => {
  try {
    const { todoID } = req.params;
    const newTodo = req.body;
    const updTodo = await Todo.findByIdAndUpdate(todoID, newTodo, {
      new: true
    });
    if (!updTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res
      .status(200)
      .json({ message: "Todo updated successfully", data: updTodo });
  } catch (err) {
    return res.status(404).json({ message: "Todo not found" });
  }
};

const deleteTodoByID = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.todoID);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    return res.status(404).json({ message: "Todo not found" });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  getTodoByID,
  updateTodoByID,
  deleteTodoByID
};
