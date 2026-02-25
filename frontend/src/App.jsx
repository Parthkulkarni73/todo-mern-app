import { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const createTodo = () => {
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setTitle("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      
      <div className="w-full max-w-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Todo
          </h1>
          <p className="text-slate-300 text-sm mt-2">
            Organize. Execute. Win.
          </p>
        </div>

        {/* Input Section */}
        <div className="flex gap-3 mb-8">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 bg-white/20 text-white placeholder-slate-400 px-5 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            onClick={createTodo}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-medium transition active:scale-95"
          >
            Add
          </button>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-sm text-slate-400 mb-6">
          <span>Total: {todos.length}</span>
          <span>
            Completed: {todos.filter((t) => t.completed).length}
          </span>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {todos.length === 0 && (
            <div className="text-center text-slate-400 py-8 border border-dashed border-white/20 rounded-2xl">
              No tasks yet
            </div>
          )}

          {todos.map((todo) => (
            <div
              key={todo.id}
              className="group flex items-center justify-between bg-white/10 border border-white/20 rounded-2xl px-5 py-4 hover:bg-white/20 transition"
            >
              <div
                onClick={() => toggleTodo(todo.id)}
                className={`flex-1 cursor-pointer text-lg transition ${
                  todo.completed
                    ? "line-through text-slate-400"
                    : "text-white"
                }`}
              >
                {todo.title}
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
