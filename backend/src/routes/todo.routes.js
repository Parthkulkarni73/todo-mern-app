import { Router } from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todo.controller.js";

const router = Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

router.get("/", (req, res) => {
  res.json([{ id: 1, title: "Test Todo" }]);
});

router.get("/", (req, res) => {
    res.status(200).json({ message: "Todo route working" });
  });

export default router;
