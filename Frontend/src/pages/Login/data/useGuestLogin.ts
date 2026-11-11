import { useMutation } from "@tanstack/react-query";

import api from "@libs/api";
import { fireError } from "@libs/alert";
import type { AuthenticationResponse } from "./dtos/AuthenticationResponse";

export function useGuestLogin() {
  return useMutation({
    mutationFn: async () => {
      const response = await api.post<AuthenticationResponse>("/Guests/Login");
      return response.data;
    },
    onError: fireError,
  });
}
