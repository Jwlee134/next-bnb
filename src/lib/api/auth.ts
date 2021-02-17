import axios from "src/pages/api";
import { User } from "src/types/user";

interface SignUpBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

export const signUpAPI = (body: SignUpBody) =>
  axios.post<User>("api/auth/signUp", body);

export const loginAPI = (body: { email: string; password: string }) =>
  axios.post<User>("api/auth/login", body);

export const meAPI = () => axios.get<User>("api/auth/me");

export const logoutAPI = () => axios.delete("/api/auth/logout");
