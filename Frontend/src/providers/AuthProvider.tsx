import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import api from "@libs/api";
import { decodeJwtPayload } from "@libs/jwt";

import AuthContext, { type AuthUser } from "@contexts/AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

function getUserFromToken(token: string | null): AuthUser | null {
  if (!token) return null;

  const payload = decodeJwtPayload(token);
  const name = typeof payload?.name === "string" ? payload.name.trim() : "";
  if (!name) return null;

  const words = name.split(/\s+/);
  const initials = [words[0], words.length > 1 ? words[words.length - 1] : ""]
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return { name, initials };
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();

  const [token, setToken_] = useState(localStorage.getItem("token"));

  const setToken = useCallback((newToken: string) => {
    setToken_(newToken);
  }, []);

  const logout = useCallback(() => {
    setToken_(null);
    queryClient.clear();
  }, [queryClient]);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      user: getUserFromToken(token),
      setToken,
      logout,
    }),
    [token, setToken, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
