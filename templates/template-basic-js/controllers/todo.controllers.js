// temporary data
let Todo = [
  {
    id: 1,
    title: "Todo 1",
    description: "Todo 1 description"
  }
];

const getAllTodos = (req, res) => {
  res.status(200).json({ message: "Success", data: Todo });
};

const createTodo = (req, res) => {
  const { todo } = req.body;
  Todo.push(todo);
  res.status(201).json({ message: "Todo added successfully", data: todo });
};

const getTodoByID = (req, res) => {
  const { todoID } = req.params;
  const todo = Todo.find((todo) => todo.id === Number(todoID));
  if (todo) {
    res.status(200).json({ message: "Todo found", data: todo });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

const updateTodoByID = (req, res) => {
  const { todoID } = req.params;
  const { todo } = req.body;
  const todoIndex = Todo.findIndex((todo) => todo.id === Number(todoID)); // todoIndex is -1 if not found
  if (todoIndex !== -1) {
    Todo[todoIndex] = todo;
    res.status(200).json({ message: "Todo updated successfully", data: todo });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

const deleteTodoByID = (req, res) => {
  const { todoID } = req.params;
  const todoIndex = Todo.findIndex((todo) => todo.id === Number(todoID));
  if (todoIndex !== -1) {
    Todo.splice(todoIndex, 1);
    res.status(200).json({ message: "Todo deleted successfully" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  getTodoByID,
  updateTodoByID,
  deleteTodoByID
};
