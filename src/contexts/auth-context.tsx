// src/contexts/auth-context.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  nama: string;
  tipe: "customer" | "admin";
  role?: "OWNER" | "STAFF";
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, type: "customer" | "admin") => Promise<void>;
  logout: () => Promise<void>;
  register: (nama: string, noWa: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("auth_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to restore auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, type: "customer" | "admin") => {
    setIsLoading(true);
    try {
      const endpoint = type === "admin" ? "/api/auth/admin-login" : "/api/auth/login";
      const body =
        type === "admin"
          ? { email, password }
          : { noWa: email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Login failed");
      }

      const data = await response.json();
      const userData: AuthUser = {
        id: data[type === "admin" ? "admin" : "customer"].id,
        nama: data[type === "admin" ? "admin" : "customer"].nama,
        tipe: type,
        role: data[type === "admin" ? "admin" : "customer"].role,
      };

      setUser(userData);
      localStorage.setItem("auth_user", JSON.stringify(userData));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      localStorage.removeItem("auth_user");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (nama: string, noWa: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, noWa, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      const data = await response.json();
      const userData: AuthUser = {
        id: data.customer.id,
        nama: data.customer.nama,
        tipe: "customer",
      };

      setUser(userData);
      localStorage.setItem("auth_user", JSON.stringify(userData));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
