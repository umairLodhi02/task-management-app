import axios from "axios";
import { AUTH_URL } from "../constant/Constants";

export const login = async (credentials) => {
  const response = await axios.post(`${AUTH_URL}/login`, credentials);
  return response.data;
};

export const signup = async (userData) => {
  const response = await axios.post(`${AUTH_URL}/signup`, userData);
  return response.data;
};
