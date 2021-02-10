import axios from "~/pages/api";
import { User } from "~/types/user";

interface SignUpBody {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  birthday: string;
}

export const signUpAPI = (body: SignUpBody) =>
  axios.post<User>("api/auth/signUp", body);
