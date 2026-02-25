import Todo from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

export const getTodos = async (req, res) => {
  try {
    const todo = await Todo.get(req.body);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.update(req.body);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
  res.json(updated);
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.delete(req.body);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }

  res.json({ message: "Deleted successfully" });
};
