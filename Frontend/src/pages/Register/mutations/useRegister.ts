import { useMutation } from "@tanstack/react-query";

import { register } from "../api/services/register";

export function useRegister() {
  return useMutation({ mutationFn: register });
}
