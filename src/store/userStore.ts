import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  phone: string;
  avatar: string | null;
  balance: number;
  points: number;
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  updateBalance: (amount: number) => void;
  updatePoints: (points: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
  updateUser: (user) => set((state) => ({
    user: state.user ? { ...state.user, ...user } : null,
  })),
  updateBalance: (amount) => set((state) => ({
    user: state.user ? { ...state.user, balance: state.user.balance + amount } : null,
  })),
  updatePoints: (points) => set((state) => ({
    user: state.user ? { ...state.user, points: state.user.points + points } : null,
  })),
}));