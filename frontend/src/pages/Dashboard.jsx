import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    api.get("/todos").then(res => setTodos(res.data));
  }, []);

  return (
    <ul>
      {todos.map(t => <li key={t._id}>{t.title}</li>)}
    </ul>
  );
}
