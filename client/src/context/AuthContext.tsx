import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, onSuccess?: Function) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// AuthProvider component to wrap the application
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Calculate isAuthenticated based on accessToken
  // const isAuthenticated = !!accessToken;

  useEffect(() => {
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  // Retrieve accessToken from sessionStorage on initial render
  useEffect(() => {
    const storedToken = sessionStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const login = async (identifier: string, password: string, onSuccess?: Function) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await response.json();
  
      if (response.ok) {
        setAccessToken(data.accessToken);
        sessionStorage.setItem("accessToken", data.accessToken);
        document.cookie = `refreshToken=${data.refreshToken}; Secure; SameSite=Strict; path=/;`;
        document.cookie = `token=${data.accessToken}; Secure; SameSite=Strict; path=/;`;
        console.log("User logged in successfully");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(data.message || "Unknown error");
        console.error("Login failed:", data.message || "Unknown error");
      }
    } catch (error) {
      toast.error("Could not log in. Please try again later.");
      console.error("An error occurred:", error);
    }
  };
  
  const logout = () => {
    setAccessToken(null);
    sessionStorage.removeItem('accessToken');
    document.cookie = 'refreshToken=; Max-Age=0; path=/;';
    console.log('User logged out');
  };

  const refreshToken = async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const data = await response.json();

      if (response.ok) {
        setAccessToken(data.accessToken);
        sessionStorage.setItem('accessToken', data.accessToken);
        console.log('Access token refreshed');
      } else {
        console.error('Token refresh failed:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('An error occurred during token refresh:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        refreshToken();
      },
      14 * 60 * 1000,
    ); // Refresh every 14 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated, login, logout, refreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
