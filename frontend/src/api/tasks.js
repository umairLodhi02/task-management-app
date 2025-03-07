import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const fetchTasks = async (status) => {
  const response = await axios.get(API_URL, {
    params: { status },
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const updateTask = async ({ id, ...taskData }) => {
  const response = await axios.patch(`${API_URL}/${id}`, taskData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
