import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:3000/api"
});

export const todoAPI = {
  getAllTodos: async () => {
    const response = await api.get('/api/todos');
    return response.data;
  },

  createTodo: async (title) => {
    const response = await api.post('/api/todos', { title });
    return response.data;
  },

  updateTodoStatus: async (id, status) => {
    const response = await api.put(`/api/todos/${id}`, { status });
    return response.data;
  },

  deleteTodo: async (id) => {
    const response = await api.delete(`/api/todos/${id}`);
    return response.data;
  }
};

export default API;
