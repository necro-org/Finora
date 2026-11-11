import api from "@libs/api";
import type { AuthenticationResponse } from "@pages/Login/api/types/AuthenticationResponse";
import type { CreateUserRequest } from "../types/CreateUserRequest";

export async function register(data: CreateUserRequest) {
  const response = await api.post<AuthenticationResponse>(
    "/Authentications/Register",
    data,
  );
  return response.data;
}
