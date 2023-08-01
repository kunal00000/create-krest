import { Request, Response } from "express";

// Temporary data
type Todo = {
  id: number;
  title: string;
  description: string;
};

let Todos: Todo[] = [
  {
    id: 1,
    title: "Todo 1",
    description: "Todo 1 description"
  }
];

// Controllers
export const getAllTodos = (req: Request, res: Response) => {
  res.status(200).json({ message: "Success", data: Todos });
};

export const createTodo = (req: Request, res: Response) => {
  const todo = req.body;
  Todos.push({ id: Todos[Todos.length - 1].id + 1, ...todo } as Todo);
  res.status(201).json({ message: "Todo added successfully", data: todo });
};

export const getTodoByID = (req: Request, res: Response) => {
  const { todoID } = req.params;
  const todo = Todos.find((todo) => todo.id === Number(todoID));
  if (todo) {
    res.status(200).json({ message: "Todo found", data: todo });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

export const updateTodoByID = (req: Request, res: Response) => {
  const { todoID } = req.params;
  const todo = req.body;
  const todoIndex = Todos.findIndex((todo) => todo.id === Number(todoID)); // todoIndex is -1 if not found
  if (todoIndex !== -1) {
    Todos[todoIndex] = { id: Number(todoID), ...todo } as Todo;
    res.status(200).json({ message: "Todo updated successfully", data: todo });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

export const deleteTodoByID = (req: Request, res: Response) => {
  const { todoID } = req.params;
  const todoIndex = Todos.findIndex((todo) => todo.id === Number(todoID));
  if (todoIndex !== -1) {
    Todos.splice(todoIndex, 1);
    res.status(200).json({ message: "Todo deleted successfully" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};
