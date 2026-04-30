import { create } from 'zustand';
import { User, LoginResponse } from '../types/auth';

interface AuthStore {
  user: User | null;
  token: string | null;
  setAuth: (loginResponse: LoginResponse) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  loadFromLocalStorage: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,

  setAuth: (loginResponse: LoginResponse) => {
    const user: User = {
      id: loginResponse.id,
      name: loginResponse.name,
      email: loginResponse.email,
      role: loginResponse.role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('user', JSON.stringify(user));

    set({ user, token: loginResponse.token });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },

  isAuthenticated: () => {
    const { token } = get();
    return !!token;
  },

  isAdmin: () => {
    const { user } = get();
    return user?.role === 'ADMIN';
  },

  loadFromLocalStorage: () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({ user, token });
      } catch (error) {
        console.error('Failed to load auth from localStorage:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  },
}));
