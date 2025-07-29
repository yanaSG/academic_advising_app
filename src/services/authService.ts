// src/services/authService.ts
import axios from "axios";

const API_URL = "http://localhost:8000/api"; // your Django API

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  [key: string]: any;
}

// Login user
export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>(
    `${API_URL}/token/`,
    { username, password }
  );
  return data;
};

export const signup = async (data: {
  username: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
}) => {
  return axios.post(`${API_URL}/register/`, {
    username: data.username,           // ✅ now from user input
    first_name: data.fname,
    last_name: data.lname,
    email: data.email,
    password: data.password,
    password2: data.password,          // ✅ required by serializer
  });
};



// Refresh access token
export const refreshToken = async (refresh: string): Promise<{ access: string }> => {
  const { data } = await axios.post<{ access: string }>(
    `${API_URL}/token/refresh/`,
    { refresh }
  );
  return data;
};

// Get user profile with the access token
export const getUserProfile = async (access: string): Promise<User> => {
  const { data } = await axios.get<User>(`${API_URL}/users/me/`, {
    headers: { Authorization: `Bearer ${access}` },
  });
  return data;
};
