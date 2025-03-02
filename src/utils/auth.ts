import { toast } from "@/components/ui/use-toast";

const API_URL = 'http://localhost:5001/api';

export interface AuthResponse {
  user: {
    id: string;
    username: string;
    email: string;
  };
  token: string;
  message: string;
}

export const login = async (email: string, password: string): Promise<AuthResponse | null> => {
  try {
    console.log('Attempting login...');
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    const data = await response.json();
    console.log('Login response:', data);

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (error) {
    console.error('Login error:', error);
    toast({
      variant: "destructive",
      title: "Login Error",
      description: error instanceof Error ? error.message : "Failed to login",
    });
    return null;
  }
};

export const register = async (username: string, email: string, password: string): Promise<AuthResponse | null> => {
  try {
    console.log('Attempting registration...', { username, email });
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
      credentials: 'include'
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('Registration failed:', data);
      throw new Error(data.error || 'Registration failed');
    }

    const data = await response.json();
    console.log('Registration successful:', data);

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    toast({
      variant: "destructive",
      title: "Registration Error",
      description: error instanceof Error ? error.message : "Failed to register",
    });
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const getToken = () => {
  return localStorage.getItem('token');
};
