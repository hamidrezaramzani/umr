import { LoginFormValuesType } from "../../components/Auth/Login/Login";
import client from "../client";
export const loginRequest = async (data: LoginFormValuesType) => {
  return await client.post("/auth/login", data);
};
