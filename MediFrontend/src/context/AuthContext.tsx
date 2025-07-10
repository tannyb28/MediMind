import React, { createContext, useState, useContext, type ReactNode, useEffect } from "react";
import { api } from "../services/api";

interface User { id: string; username: string; full_name: string; device_id: string; disease_state: string; }

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/patients/me").then(res => setUser(res.data)).catch(() => { localStorage.removeItem("token"); });
    }
  }, []);

  const login = async (username: string, password: string) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    const res = await api.post("/auth/token", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    if (res.status !== 200) throw new Error("Login failed");
    console.log("Login successful:", res);
    const token = res.data.access_token;
    console.log("Received token:", token);
    localStorage.setItem("token", token);
    const profile = (await api.get("/patients/me")).data;
    setUser(profile);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}