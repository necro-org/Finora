import api from "@libs/api";
import type { AuthenticationResponse } from "../types/AuthenticationResponse";

export async function loginGuest() {
  const response = await api.post<AuthenticationResponse>("/Guests/Login");
  return response.data;
}
