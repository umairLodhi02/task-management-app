import axios from "axios";
import { TASKS_URL } from "../constant/Constants";

export const fetchTasks = async (status) => {
  const response = await axios.get(TASKS_URL, {
    params: { status },
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post(TASKS_URL, taskData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const updateTask = async ({ id, ...taskData }) => {
  const response = await axios.patch(`${TASKS_URL}/${id}`, taskData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`${TASKS_URL}/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};
