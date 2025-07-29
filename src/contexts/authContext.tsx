import React, { createContext, useContext, useEffect, useState } from "react";
import * as AuthService from "../services/authService";

type User = AuthService.User;

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>; // ✅ rename
  logout: () => void;
  loading: boolean;
}


const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");

      if (access && refresh) {
        try {
          const userData: User = await AuthService.getUserProfile(access);
          setUser(userData);
          scheduleTokenRefresh();
        } catch {
          await handleTokenRefresh();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const handleTokenRefresh = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return logout();

    try {
      const data = await AuthService.refreshToken(refresh);
      localStorage.setItem("access", data.access);
      const userData = await AuthService.getUserProfile(data.access);
      setUser(userData); // ✅ no unknown now

      scheduleTokenRefresh();
    } catch {
      logout();
    }
  };

  const scheduleTokenRefresh = () => {
    // refresh every 4 min if JWT expires in 5 min (adjust as needed)
    setTimeout(handleTokenRefresh, 4 * 60 * 1000);
  };

  const login = async (username: string, password: string) => { // ✅ match backend
    setLoading(true);
    try {
      const data = await AuthService.login(username, password); // ✅ use username
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      const userData = await AuthService.getUserProfile(data.access);
      setUser(userData);

      scheduleTokenRefresh();
    } finally {
      setLoading(false);
    }
  };


  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
