import { useMutation } from "@tanstack/react-query";

import { login } from "../api/services/login";

export function useLogin() {
  return useMutation({ mutationFn: login });
}
