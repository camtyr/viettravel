import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  id: number | null;
  username: string | null;
  token: string | null;
  email: string | null;
  role: string | null;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [id, setId] = useState<number | null>(null);
  const [username, setUserName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Load từ localStorage khi mở app
  useEffect(() => {
    const storedId = localStorage.getItem('id');
    const storedToken = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedRole = localStorage.getItem('role');

    if (storedId && storedToken && storedUserName) {
      setId(Number(storedId));
      setToken(storedToken);
      setUserName(storedUserName);
      setEmail(storedEmail);
      setRole(storedRole);
    }
  }, []);

  // Đăng ký
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post('http://localhost:5000/api/Account/register', {
        userName: username,
        email,
        password,
      });

      localStorage.setItem('id', res.data.id);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);
      localStorage.setItem('role', res.data.role);

      setId(res.data.id);
      setToken(res.data.token);
      setUserName(res.data.username);
      setEmail(res.data.email);
      setRole(res.data.role);

      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  // Đăng nhập
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post('http://localhost:5000/api/Account/login', {
        email,
        password,
      });

      localStorage.setItem('id', res.data.id);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('email', res.data.email);
      localStorage.setItem('role', res.data.role);

      setId(res.data.id);
      setToken(res.data.token);
      setUserName(res.data.username);
      setEmail(res.data.email);
      setRole(res.data.role);

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Đăng xuất
  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setId(null);
    setToken(null);
    setUserName(null);
    setEmail(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ id, username, token, email, role, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
