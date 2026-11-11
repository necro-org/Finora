import { useMutation } from "@tanstack/react-query";

import { loginGuest } from "../api/services/loginGuest";

export function useGuestLogin() {
  return useMutation({ mutationFn: loginGuest });
}
