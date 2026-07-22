"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  clearAuthSession,
  getAccessToken,
  getStoredUser,
  setAuthSession,
  type StoredUser,
} from "@/lib/api/auth-session";

interface AuthContextData {
  user: StoredUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: StoredUser, token: string, refreshToken?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = getAccessToken();
    const storedUser = getStoredUser();

    if (storedToken && storedUser) {
      setAuthSession({
        user: storedUser,
        accessToken: storedToken,
      });
      setToken(storedToken);
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  function login(
    nextUser: StoredUser,
    nextToken: string,
    refreshToken?: string,
  ) {
    setAuthSession({
      user: nextUser,
      accessToken: nextToken,
      refreshToken,
    });

    setUser(nextUser);
    setToken(nextToken);
  }

  function logout() {
    clearAuthSession();
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
