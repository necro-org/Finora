import api from "@libs/api";
import type { AuthenticationResponse } from "../types/AuthenticationResponse";
import type { LoginUserRequest } from "../types/LoginUserRequest";

export async function login(data: LoginUserRequest) {
  const response = await api.post<AuthenticationResponse>(
    "/Authentications/Login",
    data,
  );
  return response.data;
}
