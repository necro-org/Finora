import { createContext } from "react";

export interface AuthUser {
  name: string;
  initials: string;
}

export interface AuthContextState {
  token: string | null;
  isAuthenticated: boolean;
  user: AuthUser | null;
  setToken: (newToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextState>({
  token: "",
  isAuthenticated: false,
  user: null,
  setToken: () => undefined,
  logout: () => undefined,
});

export default AuthContext;
