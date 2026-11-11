import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import api from "@libs/api";
import { AxiosError, HttpStatusCode } from "axios";
import { toast } from "react-toastify";

import { decodeJwtPayload, getTokenExpiresAt, isTokenValid } from "@libs/jwt";

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

  const [token, setToken_] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return isTokenValid(storedToken) ? storedToken : null;
  });

  const setToken = useCallback((newToken: string) => {
    setToken_(newToken);
  }, []);

  const logout = useCallback(() => {
    setToken_(null);
    queryClient.clear();
  }, [queryClient]);

  const expireSession = useCallback(() => {
    toast.info("Sua sessão expirou, entre novamente", {
      toastId: "session-expired",
    });
    logout();
  }, [logout]);

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error instanceof AxiosError &&
          error.response?.status === HttpStatusCode.Unauthorized
        ) {
          expireSession();
        }
        return Promise.reject(error);
      },
    );

    return () => api.interceptors.response.eject(interceptorId);
  }, [expireSession]);

  useEffect(() => {
    const expiresAt = getTokenExpiresAt(token);
    if (expiresAt === null) return;

    const timeoutId = setTimeout(
      expireSession,
      Math.max(expiresAt - Date.now(), 0),
    );

    return () => clearTimeout(timeoutId);
  }, [token, expireSession]);

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
      isAuthenticated: isTokenValid(token),
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
